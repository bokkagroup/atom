/*
   ___      _
  / __|_  _| |_ __
 | (_ | || | | '_ \
  \___|\_,_|_| .__/
             |_|

 */

var gulp            = require('gulp');
var runSequence     = require('run-sequence');

gulp.task('default', function() {
    runSequence('build-clean', ['watch-styles', 'watch-js', 'watch-php']);
});
