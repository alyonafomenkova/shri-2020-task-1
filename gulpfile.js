"use strict";

var gulp = require("gulp"); // сам сборщик
var sass = require("gulp-sass"); // преобразует контент из sass в css
var plumber = require("gulp-plumber"); // показывает ошибки в консоли и продолжает выполнение потока (не останавливает выполнение скрипта)
var postcss = require("gulp-postcss"); // плагин для преобразования сss
var posthtml = require("gulp-posthtml"); // парсер HTML
var autoprefixer = require("autoprefixer"); // автопрефексер, работает в потоке postcss
var server = require("browser-sync").create(); // автоматически перезагружает страницу
var del = require("del"); // плагин для удаления файлов и папок
var rename = require("gulp-rename"); // плагин для переименования файлов
var csso = require("gulp-csso"); // минификатор css
var uglify = require("gulp-uglify"); // минификатор JS
var concat = require("gulp-concat"); // плагин для объединения файлов

gulp.task("copy", function () {
  return gulp.src([
    "source/js/**",
    "source/*.html"
  ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

// gulp.task("html", function () {
//   return gulp.src("source/*.html")
//     .pipe(posthtml([]))
//     .pipe(rename(function (path) {
//       path.basename += ".min";
//     }))
//     .pipe(gulp.dest("build"));
// });

gulp.task("indexjs", function () {
  return gulp.src([
    // "source/js/map.js",
    // "source/js/menu-toggle.js",
    // "source/js/slider.js",
    // "source/js/picturefill.min.js",
    // "source/js/svg4everybody.min.js"
  ])
    .pipe(concat("index.js"))
    .pipe(uglify())
    .pipe(rename("index.min.js"))
    .pipe(gulp.dest("build/js"))
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  //"html",
  //"indexjs",
));

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  //gulp.watch("source/js/*.js", gulp.series("indexjs", "refresh"));
  //gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("start", gulp.series("build", "server"));
