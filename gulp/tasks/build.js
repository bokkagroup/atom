/*
  ___      _ _    _
 | _ )_  _(_) |__| |
 | _ \ || | | / _` |
 |___/\_,_|_|_\__,_|

 */

var gulp            = require('gulp');
var del             = require('del');
var runSequence     = require('run-sequence');

gulp.task('build-clean', function () {

    return del([
        './assets/build/**/*',
        './assets/build'
    ]);

});

gulp.task('build', function () {

    // primary async build tasks
    var buildTasks = [
        'sprites',
        'css',
        'copyfonts',
        'image',
        'phpcs',
        'phplint',
        'build-webpack'
    ];

    // tasks to run after everything else has finished
    runSequence('build-clean', buildTasks, function () {
        gulp.start('css-clean');
        gulp.start('css-optimize');
        gulp.start('sprites-clean');
    });

});
