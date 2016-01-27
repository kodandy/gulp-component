var gulp = require("gulp");
var stylus = require('gulp-stylus');
var autoprefixer = require("gulp-autoprefixer");
var frontnote = require("gulp-frontnote");
var uglify = require("gulp-uglify");
var browser = require("browser-sync");

gulp.task("server", function() {
    browser({
      server: {
        baseDir: "./"
      }
    });
});

gulp.task("default",['server'], function() {
    gulp.watch(["js/**/*.js","!js/min/**/*.js"],["js"]);
    gulp.watch("stylus/**/*.styl");
});

gulp.task('stylus', function() {
    gulp.src('stylus/**/*styl')
      .pipe(plumber())
      .pipe(frontnote({
        css: '../css/style.css'
      }))
      .pipe(stylus())
      .pipe(autoprefixer())
      .pipe(gulp.dest('./css'));
      .pipe(browser.reload({stream:true}))
});

gulp.task("js", function() {
    gulp.src(["js/**/*.js","!js/min/**/*.js"])
      .pipe(plumber())
      .pipe(uglify())
      .pipe(gulp.dest("./js/min"));
      .pipe(browser.reload({stream:true}))
});
