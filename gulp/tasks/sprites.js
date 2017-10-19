/*
  ___          _ _
 / __|_ __ _ _(_) |_ ___ ___
 \__ \ '_ \ '_| |  _/ -_|_-<
 |___/ .__/_| |_|\__\___/__/
     |_|

 */

var gulp        = require('gulp')
var sprity      = require('sprity');
var gulpif      = require('gulp-if');

gulp.task('sprites', function (cb) {

    // Generate sprite image file and css
    return sprity.src({
        src: 'assets/src/img/icons/*.{png,jpg}',
        style: './sprite.css',
        prefix: 'sprite',
        dimension: [{
            ratio: 1, dpi: 72
        }, {
            ratio: 2, dpi: 192
        }]
    })
    .on('error', function(err) {
        console.log(err.toString());
        cb();
    })
    .pipe(gulpif('*.png', gulp.dest('./assets/build/img/'), gulp.dest('./assets/src/css/base/')));

});
