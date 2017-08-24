var gulp = require('gulp');
var gutil = require('gulp-util');//工具类
var uglify = require('gulp-uglify');//js压缩
var combiner = require('stream-combiner2');//异常处理
var sourcemaps = require('gulp-sourcemaps');//source map
var minifycss = require('gulp-clean-css');//压缩css
var autoprefixer = require('gulp-autoprefixer');//css自动补全其他版本
var imagemin = require('gulp-imagemin');//图片压缩
var fileinclude = require('gulp-file-include');//类似于 jstl <include>
var rename = require('gulp-rename');// 文件重命名
var concat = require("gulp-concat");// 文件合并
var clean = require('del');//清理文件
var less = require('gulp-less');//编译less
var postcss = require('gulp-postcss');
var px2rem = require('postcss-px2rem');//将px转rem

var browserSync = require('browser-sync').create();//浏览器同步

// Static server
gulp.task('browser', function() {
    var files = [
        '**/*.html',
        '**/*.css',
        '**/*.png',
        '**/*.js'
    ];
    browserSync.init(files,{
        server: {
            baseDir: "./dist"
        }
    });
});

/**
 * 若发现异常处理
 * @param err
 */
var handleError = function (err) {
    var colors = gutil.colors;
    console.log('\n');
    gutil.log(colors.red('Error!'));
    gutil.log('fileName: ' + colors.red(err.fileName));
    gutil.log('lineNumber: ' + colors.red(err.lineNumber));
    gutil.log('message: ' + err.message);
    gutil.log('plugin: ' + colors.yellow(err.plugin));
};

/***
 * 清理输出文件夹
 */
gulp.task('clean:all', function (cb) {
    clean('dist/*', cb);
});

/***
 * 压缩js
 */
gulp.task('compile:js', function () {
    var combined = combiner.obj([
        sourcemaps.init(),
        gulp.src('src/js/*.js'),
        uglify(),
        sourcemaps.write('./'),
        gulp.dest('dist/js/')
    ]);
    combined.on('error', handleError)
});


/****
 * 压缩css
 */
gulp.task('compile:less', function () {
    var processors = [px2rem({remUnit: 75})];
    var combined = combiner.obj([
        gulp.src('src/less/*.less'),
        sourcemaps.init(),
        autoprefixer({
            browsers: 'last 2 versions'
        }),
        less(),
        postcss(processors),
        minifycss(),
        sourcemaps.write('./'),
        gulp.dest('dist/css/')
    ]);
    combined.on('error', handleError)
});

gulp.task('build:weuix', function () {
    var combined = combiner.obj([
        gulp.src(['src/css/weui.css', 'src/css/frame.css']),
        sourcemaps.init(),
        concat('weuix.min.css"'),
        rename("weuix.min.css"),
        minifycss(),
        sourcemaps.write('./'),
        gulp.dest('dist/css/')
    ]);
    combined.on('error', handleError)
});

/***
 * 图片压缩
 */
gulp.task('compile:image', function () {
    var combined = combiner.obj([
        gulp.src("src/images/*.{jpg,jpeg,png,gif}"),
        imagemin(),
        gulp.dest('dist/images/')
    ]);
    combined.on('error', handleError)
});

/****
 * include 头部文件、底部文件
 */
gulp.task('compile:include', function () {
    gulp.src(["src/*.html"])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist/'));
});

/****
 * 监听js文件变化，压缩
 */
gulp.task('watch:all', function () {
    gulp.watch('src/js/*.js', ["compile:js"]);
    gulp.watch('src/less/*.less', ["compile:less"]);
    gulp.watch('src/css/*.css', ["build:weuix"]);
    gulp.watch(['src/*.tpl', 'src/*.html'], ["compile:include"]);
    gulp.watch('src/images/*.{jpg,jpeg,png,gif}', ["compile:image"])
});

//初始化
gulp.task("init", ["clean:all", 'compile:js', 'compile:less', 'build:weuix', 'compile:include', 'compile:image']);

//监听文件变动
gulp.task('default', ['watch:all','browser']);


