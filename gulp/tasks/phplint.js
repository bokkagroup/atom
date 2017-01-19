var gulp    = require('gulp')
var phplint = require('phplint').lint

gulp.task('phplint', function (cb) {
    var opt = {
        limit: 10,
        stdout: false,
        stderr: false
    }
    phplint(['**/*.php', '!node_modules/**/*', '!lib/**/*'], opt, function (err, stdout, stderr) {
        if (err) {
            cb(err)
            process.exit(1)
        }
        cb()

    })

})