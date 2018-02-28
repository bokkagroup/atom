/*
  ___
 |_ _|_ __  __ _ __ _ ___ ___
  | || '  \/ _` / _` / -_|_-<
 |___|_|_|_\__,_\__, \___/__/
                |___/

 */

var gulp            = require('gulp');
var imagemin        = require('gulp-imagemin');
var pngquant        = require('imagemin-pngquant');
var plumber         = require('gulp-plumber')
var notify          = require('gulp-notify')

gulp.task('image', () => {
    gulp.src(['assets/src/img/**/*', '!assets/src/img/icons', '!assets/src/img/icons/*'])
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('assets/build/img'))
});
