/*
  ___        _
 | __|__ _ _| |_ ___
 | _/ _ \ ' \  _(_-<
 |_|\___/_||_\__/__/

 */

var gulp = require('gulp');

gulp.task('copyfonts', function() {
    gulp.src('./assets/src/fonts/**/*.{ttf,woff,woff2,eof,svg}')
        .pipe(gulp.dest('./assets/build/fonts'));
});
