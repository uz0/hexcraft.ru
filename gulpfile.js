var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');

// Styles
gulp.task('styles', () => {
  return gulp.src('src/site/stylesheets/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('public/stylesheets'))
});

// Scripts
gulp.task('scripts', () => {
  return gulp.src('src/javascripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('public/javascripts'))
});

// Default task
gulp.task('default', ['styles', 'scripts']);

// Watch
gulp.task('watch', () => {
  // Watch .scss files
  gulp.watch('src/site/stylesheets/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('src/javascripts/**/*.js', ['scripts']);

});