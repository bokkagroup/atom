/*
 __      __    _      _
 \ \    / /_ _| |_ __| |_
  \ \/\/ / _` |  _/ _| ' \
   \_/\_/\__,_|\__\__|_||_|

 */

var gulp = require('gulp')
var livereload = require('gulp-livereload')


gulp.task('watch-styles', ['css', 'copyfonts', 'image'], function () {
    gulp.watch(['assets/src/css/**/*.css'], ['css'])
    gulp.watch(['assets/src/images/**/*'], ['image'])
    gulp.watch(['assets/src/fonts/**/*.{ttf,woff,woff2,eof,svg}'], ['copyfonts'])
    livereload.listen();
})

gulp.task('watch-js', ['build-webpack'], function () {
    gulp.watch(['assets/src/js/**/*.js', 'assets/src/js/**/*.html'], ['build-webpack'])
    livereload.listen()
})

gulp.task('watch-php', ['phpcs', 'phplint'], function () {
    gulp.watch(['**/*.php'], ['phpcs', 'phplint'])
    livereload.listen()
})