/*
  ___         _      _
 / __| __ _ _(_)_ __| |_ ___
 \__ \/ _| '_| | '_ \  _(_-<
 |___/\__|_| |_| .__/\__/__/
               |_|

 */

var gulp            = require('gulp');
var webpack         = require('webpack');
var webpack         = require('webpack-stream');
var webpackConfig   = require('../../webpack.config.js');
var livereload      = require('gulp-livereload');

const SRC = [
    '../../assets/src/js/initialize.js',
    '!node_modules/**/*',
    '!gulp/**/*',
    '!build/**/*'
];

const DEST = './assets/build/js/';

gulp.task('build-webpack', [], function () {

    webpackConfig.watch = false;

    return gulp.src(SRC)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(DEST))
        .pipe(livereload());

});

gulp.task('watch-webpack', [], function () {

    webpackConfig.watch = true;

    return gulp.src(SRC)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(DEST))
        .pipe(livereload());

});
