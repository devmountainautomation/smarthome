import gulp from 'gulp';
import concat from 'gulp-concat';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import plumber from 'gulp-plumber';
import autoprefixer from 'gulp-autoprefixer';
import path from 'path';

const paths = {
  scssSource: './public/assets/styles/**/*.scss',
  scssDest: './public/compiled',
  jsSource: ['./public/**/*.js', '!public/plugins/**/*.js', '!public/compiled/**/*.js'],
  jsDest: './public/compiled'
};

gulp.task('styles', () => {
  return gulp.src(["./public/assets/styles/reset.css", "./public/assets/styles/normalize.css", "./public/assets/styles/fonts.css", paths.scssSource])
  .pipe(autoprefixer({
            browsers: ['last 8 versions'],
            cascade: false
        }))
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('styles.css'))
  .pipe(gulp.dest(paths.scssDest));
});

gulp.task('frontjs', () => {
  return gulp.src(["./public/app/app.module.js", "./public/app/timedropper.js", ...paths.jsSource])
  .pipe(plumber())
  .pipe(babel({
    presets: ["es2015"]
  }))
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest(paths.jsDest));
});

gulp.task('watch', () =>  {
  gulp.watch(paths.jsSource, ['frontjs']);
  gulp.watch(paths.scssSource, ['styles']);
});

gulp.task('default', ['watch', 'frontjs', 'styles']);
