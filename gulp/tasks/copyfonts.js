/*
  ___        _
 | __|__ _ _| |_ ___
 | _/ _ \ ' \  _(_-<
 |_|\___/_||_\__/__/

 */

var gulp = require('gulp');

gulp.task('copyfonts', function() {
    var SRC = [
        './assets/src/fonts/**/*.{ttf,woff,woff2,eof,svg}',
        './node_modules/font-awesome/fonts/*.{ttf,woff,woff2,eof,svg,eot}'
    ];

    gulp.src(SRC)
        .pipe(gulp.dest('./assets/build/fonts'));
});
