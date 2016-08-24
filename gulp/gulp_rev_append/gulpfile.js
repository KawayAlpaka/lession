var gulp = require('gulp'),
    rev = require('gulp-rev-append');

gulp.task('testRev', function () {
    gulp.src('src/html/index.html')
        .pipe(rev())
        .pipe(gulp.dest('dist/html'));
});