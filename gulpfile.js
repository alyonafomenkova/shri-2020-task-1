const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const del = require('del');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify-es').default;

gulp.task('clean', () => del('build'));

gulp.task('css', () => gulp.src('source/sass/style.scss')
  .pipe(plumber())
  .pipe(sass({
    includePaths: 'node_modules/normalize-scss/sass',
  }))
  .pipe(postcss([
    autoprefixer(),
  ]))
  .pipe(csso())
  .pipe(gulp.dest('build')));

gulp.task('js', () => gulp.src([
  'source/js/script.js',
])
  .pipe(uglify())
  .pipe(gulp.dest('build')));

gulp.task('build', gulp.series(
  'clean',
  'css',
  'js',
));
