/*
  ___         _      _
 / __| __ _ _(_)_ __| |_ ___
 \__ \/ _| '_| | '_ \  _(_-<
 |___/\__|_| |_| .__/\__/__/
               |_|

 */

var gulp    = require('gulp')
var webpack = require('webpack')
var webpack = require('webpack-stream')
var livereload = require('gulp-livereload')

gulp.task('build-webpack', [], function () {
    return gulp.src(['../../assets/src/js/initialize.js', '!node_modules/**/*', '!gulp/**/*', '!build/**/*'])
        .pipe(webpack(require('../../webpack.config.js') ))
        .pipe(gulp.dest('./assets/build/js/'))
        .pipe(livereload())
})