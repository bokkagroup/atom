/*
 __      __    _      _
 \ \    / /_ _| |_ __| |_
  \ \/\/ / _` |  _/ _| ' \
   \_/\_/\__,_|\__\__|_||_|

 */

var gulp                = require('gulp');
var livereload          = require('gulp-livereload');

gulp.task('watch-styles', ['sprites', 'css', 'copyfonts', 'image'], function () {
    livereload.listen();
    gulp.watch(['assets/src/img/icons/*.{png,jpg}'], ['sprites']);
    gulp.watch(['assets/src/css/**/*.css'], ['css']);
    gulp.watch(['assets/src/fonts/**/*.{ttf,woff,woff2,eof,svg}'], ['copyfonts']);
    gulp.watch(['assets/src/img', 'assets/src/img/**/*', '!assets/src/img/icons', '!assets/src/img/icons/*'], ['image']);
});

gulp.task('watch-js', ['build-webpack'], function () {
    livereload.listen();
    gulp.watch(['assets/src/js/*.js', 'assets/src/js/**/*.js', 'assets/src/js/**/*.html'], ['build-webpack']);
});

gulp.task('watch-php', ['phpcs', 'phplint'], function () {
    livereload.listen();
    gulp.watch(['*.php', '**/*.php'], ['phpcs', 'phplint']);
});
