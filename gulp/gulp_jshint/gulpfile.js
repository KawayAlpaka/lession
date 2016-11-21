const jshint = require('gulp-jshint');
const gulp   = require('gulp');

// 参考：
// https://my.oschina.net/Jeky/blog/93200  （效果不一致）
var options = {
    curly: true,
    eqeqeq: true,
    newcap: true,
    noarg: true,
    sub: true,
    undef: true,
    boss: true,
    node: true
};

gulp.task('lint', function() {
    return gulp.src('./src/js/*.js')
        .pipe(jshint(options))
        .pipe(jshint.reporter('default'));
});