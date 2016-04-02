const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const jade = require('gulp-jade');
const marked = require('marked');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const nodemon = require('gulp-nodemon')

const path = {
  styles: {
    from: 'src/site/stylesheets/**/*.scss',
    to: 'public/stylesheets'
  },
  scripts: {
    from: 'src/site/javascripts/**/*.js',
    to: 'public/javascripts'
  },
  templates: {
    from: 'src/site/templates/**/*.jade',
    exclude: ['!**/layout.jade', '!**/_header.jade', '!**/_footer.jade'],
    to: 'public/'
  }
}

// Styles
gulp.task('styles', () => {
  return gulp.src(path.styles.from)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer('last 2 version'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(path.styles.to))
});

// Scripts
gulp.task('scripts', () => {
  return gulp.src(path.scripts.from)
    .pipe(sourcemaps.init())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(concat('bundle.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.scripts.to))
});

// Templates
gulp.task('templates', () => {
  return gulp.src(path.templates.exclude.concat([path.templates.from]))
    .pipe(jade({
      pretty: false
    }))
    .pipe(gulp.dest(path.templates.to))
});

// Watch
gulp.task('watch', () => {
  gulp.watch(path.styles.from, ['styles']);
  gulp.watch(path.scripts.from, ['scripts']);
  gulp.watch(path.templates.from, ['templates']);
  nodemon({ script: 'app.js', ext: 'js'}).on('restart', () => {
    console.log('restarted');
  })
});

// CLR
gulp.task('clr', () => {
  process.stdout.write('\x1Bc');
});

// Default task
gulp.task('default', ['clr', 'styles', 'scripts', 'templates', 'watch']);