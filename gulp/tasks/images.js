/*
  ___
 |_ _|_ __  __ _ __ _ ___ ___
  | || '  \/ _` / _` / -_|_-<
 |___|_|_|_\__,_\__, \___/__/
                |___/

 */

var gulp        = require('gulp');
var imagemin    = require('gulp-imagemin');
var pngquant    = require('imagemin-pngquant');

gulp.task('image', () => {
    return gulp.src(['assets/src/img/**/*', '!assets/src/img/icons', '!assets/src/img/icons/*'])
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('assets/build/img'))
});
