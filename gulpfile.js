const gulp         = require('gulp');
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const jshint       = require('gulp-jshint');
const concat       = require('gulp-concat');
const jade         = require('gulp-jade');
const marked       = require('marked');
const sourcemaps   = require('gulp-sourcemaps');
const nodemon      = require('gulp-nodemon');
const glob         = require('glob');
const browserify   = require('browserify');
const babelify     = require('babelify');
const source       = require('vinyl-source-stream');
const apidoc       = require('gulp-apidoc');
const mocha        = require('gulp-spawn-mocha');

const site = {
  styles: {
    from: 'src/site/stylesheets/**/*.scss',
    to:   'public/stylesheets',
    end:  'public/stylesheets/*.css'
  },
  scripts: {
    main: 'src/site/javascripts/application.js',
    from: 'src/site/javascripts/**/*.js',
    to:   'public/javascripts'
  },
  templates: {
    from: 'src/site/templates/**/*.jade',
    ex:   [
      '!**/layout.jade',
      '!**/_header.jade',
      '!**/_footer.jade'
    ],
    to:   'public/'
  },
  assets: {
    from: 'src/site/**/*.*',
    ex:   [
      '!src/site/**/*.scss',
      '!src/site/**/*.js',
      '!src/site/**/*.jade',
      '!src/site/**/*.md'
    ],
    to:   'public/'
  }
}

const api = {
  scripts: 'src/api/**/*.js'
}

const game = {
  scripts: 'src/game/**/*.js',
  configs: 'src/game/**/*.json',
  main:    'src/game/application.js',
  assets:  'src/game/**/*.*',
  ex:      '!src/game/**/*.js',
  to:      'public/game'
}

// Styles
gulp.task('styles:site', () => {
  return gulp.src(site.styles.from)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer('last 2 version'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(site.styles.to))
});

// Scripts
gulp.task('scripts:site', () => {
  gulp.src(site.scripts.from)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))

  return browserify({
        entries: site.scripts.main,
        extensions: ['.js'],
        debug: true
      })
      .transform(babelify)
      .bundle()
      .on('error', function (err) {
        console.log(err.message);
        this.emit('end');
      })
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(site.scripts.to));

});

gulp.task('scripts:game', () => {
  gulp.src(game.scripts)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))

  return browserify({
        entries: game.main,
        extensions: ['.js'],
        debug: true
      })
      .transform(babelify)
      .bundle()
      .on('error', function (err) {
        console.log(err.message);
        this.emit('end');
      })
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(game.to));
});

gulp.task('lint:api',  () => {
  gulp.src(api.scripts)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
})

gulp.task('apidoc:api', (done) => {
  apidoc({
    src: "src/api/",
    dest: "public/apidoc/"
  }, done);
})

gulp.task('spec:api', function () {
  return gulp.src(['src/api/specs/*.specs.js'], {read: false})
    .pipe(mocha({
      debugBrk: false,
      R: 'spec',
      istanbul: false,
      timeout: 15000
    }));
});

// Templates
gulp.task('templates:site', ['styles:site'], () => {
  var styles = [];

  glob.sync(site.styles.end).forEach((file) =>  {
    styles.push(file.replace("public", ""));
  })

  return gulp.src(site.templates.ex.concat([site.templates.from]))
    .pipe(jade({
      pretty: false,
      locals: {styles: styles}
    }))
    .pipe(gulp.dest(site.templates.to))
});


// Assets
gulp.task('assets:site', () => {
  gulp.src(site.assets.ex.concat([site.assets.from]))
    .pipe(gulp.dest(site.assets.to));
});

gulp.task('assets:game', () => {
  gulp.src([game.ex, game.assets])
    .pipe(gulp.dest(game.to));
});


// Watch
gulp.task('watch', () => {
  gulp.watch(site.styles.from, ['styles:site']);
  gulp.watch(site.scripts.from, ['scripts:site']);
  gulp.watch(site.templates.from, ['templates:site']);
  gulp.watch(site.assets.from, ['assets:site']);
  gulp.watch(game.assets, ['assets:game']);
  gulp.watch([game.scripts, game.configs], ['scripts:game']);

  nodemon({
    script: 'index.js',
    watch: [api.scripts],
    ext: 'js',
    tasks: ['lint:api', 'apidoc:api']
  })
});


// CLR
gulp.task('clr', () => {
  process.stdout.write('\x1Bc');
});


// Queue task
gulp.task('site', ['styles:site', 'scripts:site', 'templates:site', 'assets:site']);
gulp.task('api', ['lint:api', 'apidoc:api']);
gulp.task('game', ['assets:game', 'scripts:game']);

gulp.task('compile', ['site', 'api', 'game']);
gulp.task('default', ['clr', 'compile', 'watch']);