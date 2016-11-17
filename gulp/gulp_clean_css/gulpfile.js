var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');

gulp.task('css', function() {
    return gulp.src('src/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css/'));
});