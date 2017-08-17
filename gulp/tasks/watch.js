/*
 __      __    _      _
 \ \    / /_ _| |_ __| |_
  \ \/\/ / _` |  _/ _| ' \
   \_/\_/\__,_|\__\__|_||_|

 */

var gulp                = require('gulp');
var livereload          = require('gulp-livereload');

gulp.task('watch-styles', ['css', 'copyfonts', 'image', 'sprites'], function () {
    livereload.listen();
    gulp.watch(['assets/src/css/**/*.css'], ['css']);
    gulp.watch(['assets/src/images/**/*', '!assets/src/images/icons', '!assets/src/images/icons/*'], ['image']);
    gulp.watch(['assets/src/fonts/**/*.{ttf,woff,woff2,eof,svg}'], ['copyfonts']);
});

gulp.task('watch-js', ['build-webpack'], function () {
    livereload.listen();
    gulp.watch(['assets/src/js/*.js', 'assets/src/js/**/*.js', 'assets/src/js/**/*.html'], ['build-webpack']);
});

gulp.task('watch-php', ['phpcs', 'phplint'], function () {
    livereload.listen();
    gulp.watch(['**/*.php'], ['phpcs', 'phplint']);
});
