var gulp = require('gulp')
gulp.task('copyfonts', function() {
    gulp.src('./assets/src/fonts/**/*.{ttf,woff,woff2,eof,svg}')
        .pipe(gulp.dest('./assets/build/fonts'));
});
