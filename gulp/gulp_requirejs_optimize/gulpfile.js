var gulp = require('gulp');
var requirejsOptimize = require('gulp-requirejs-optimize');

gulp.task('scripts', function () {
    return gulp.src('src/js/main.js')
        .pipe(requirejsOptimize({
            // insertRequire: ['foo/bar/bop'],
            mainConfigFile: 'src/js/main.js',
            optimize: 'none'

        }))
        .pipe(gulp.dest('dist/js'));
});