/*
  ___          _ _
 / __|_ __ _ _(_) |_ ___ ___
 \__ \ '_ \ '_| |  _/ -_|_-<
 |___/ .__/_| |_|\__\___/__/
     |_|

 */

var gulp            = require('gulp');
var gutil           = require('gulp-util');
var del             = require('del');
var rename          = require('gulp-rename');
var replace         = require('gulp-replace');
var responsive      = require('gulp-responsive');
var spritesmith     = require('gulp.spritesmith');

gulp.task('resize', function () {

    var SRC = './assets/src/images/icons/2x/*.{png,jpg}';
    var DEST = './assets/src/images/icons/1x';

    // Resize @2x images to @1x
    return gulp.src(SRC)
        .pipe(responsive({
            '*': {
                width: '50%',
                height: '50%',
            }
        }).on('error', function (err) {
            gutil.log(err.plugin + ': No matching images found in source: ' + SRC, '');
        }))
        .pipe(rename(function (path) {
            path.basename = path.basename.replace(/(@2x)/g, '');
        }))
        .pipe(gulp.dest(DEST));

});

gulp.task('sprites', ['resize'], function () {

    var SRC = './assets/src/images/icons/**/*.{png,jpg}';
    var DEST = './assets/build/images';

    // Generate sprite image file and css
    var spriteData = gulp.src(SRC)
        .pipe(spritesmith({
            retinaSrcFilter: ['./assets/src/images/icons/**/*@2x.{png,jpg}'],
            imgName: 'sprite.png',
            retinaImgName: 'sprite@2x.png',
            imgPath: '../images/sprite.png',
            retinaImgPath: '../images/sprite@2x.png',
            cssName: 'sprite.css'
        }));

        spriteData.img.pipe(gulp.dest(DEST));
        spriteData.css
            .pipe(replace(/\s?\.icon-/gm, '.sprite-'))
            .pipe(gulp.dest("./assets/src/css/base"));

});

gulp.task('sprites-clean', function () {

    return del([
        './assets/build/images/icons/**/*',
        './assets/build/images/icons',
        './assets/src/images/icons/1x'
    ]);

});
