var gulp = require('gulp');

gulp.task("movecss",function () {
    gulp.src(['src/css/**'])
        .pipe(gulp.dest('./dist/css'));
});

gulp.task("serve",["movecss"],function () {
    gulp.watch('src/css/**', ['movecss']);
});