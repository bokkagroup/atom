/*
 __________ ____ ___.___.____     ________
 \______   \    |   \   |    |    \______ \
  |    |  _/    |   /   |    |     |    |  \
  |    |   \    |  /|   |    |___  |    `   \
  |______  /______/ |___|_______ \/_______  /
         \/                     \/        \/
 */


var gulp            = require('gulp')
var del             = require('del')
var runSequence     = require('run-sequence')

gulp.task('build-clean', function () {
    // tasks to run before the build process starts
    return del([
        './assets/build/**/*',
        './assets/build'
    ]);
});

gulp.task('build', function () {

    // primary async build tasks
    var buildTasks = [
        // 'sprites',
        'css',
        'copyfonts',
        'image',
        'phpcs',
        'phplint',
        'build-webpack'
    ];

    runSequence('build-clean', buildTasks, function () {
        // tasks to run after everything else has finished
        gulp.start('css-clean');
        gulp.start('css-optimize');
        // gulp.start('sprites-clean');
    });
});