var gulp    = require('gulp')
var gulpif  = require('gulp-if')
var sprity  = require('sprity')

// generate sprite.png and _sprite.scss
gulp.task('sprites', function () {
    return sprity.src({
            src: './assets/src/images/icons/**/*.{png,jpg}',
            style: './assets/src/css/base/sprite.css',
            prefix: 'sprite',
            'dimension': [{
                ratio: 1, dpi: 72
            }, {
                ratio: 2, dpi: 192
            }],

        })
        .pipe(gulpif('*.png', gulp.dest('./assets/build/images/'), gulp.dest('./assets/src/css/base/')))
});