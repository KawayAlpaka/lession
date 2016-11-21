const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

gulp.task('default', () =>
gulp.src('src/images/*')
    .pipe(imagemin({
        optimizationLevel: 7, //类型：Number  默认：3  取值范围：0-7（优化等级）
        progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
        interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
        multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
    }))
    .pipe(gulp.dest('dist/images'))
);