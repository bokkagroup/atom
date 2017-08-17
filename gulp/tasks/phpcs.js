/*
  ___ _  _ ___  ___ ___
 | _ \ || | _ \/ __/ __|
 |  _/ __ |  _/ (__\__ \
 |_| |_||_|_|  \___|___/

 */

var gulp    = require('gulp')
var phpcs   = require('gulp-phpcs')
var livereload = require('gulp-livereload')

gulp.task('phpcs', function () {
    return gulp.src(['**/*.php', '!node_modules/**/*', '!lib/**/*',  '!./css/**/*', '!**/*.css.map'])
        .pipe(phpcs({
            standard: 'PSR2',
            warningSeverity: 0
        }))
        .pipe(phpcs.reporter('log'))
})