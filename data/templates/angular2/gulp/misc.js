'use strict';
const path = require('path');
const gulp = require('gulp');
const del = require('del');
const filter = require('gulp-filter');
const conf = require('../config/gulp.conf');
gulp.task('clean', clean);
gulp.task('other', other);
function clean() {
  return del([
    conf.paths.dist,
    conf.paths.tmp,
    conf.paths.coverage
  ]);
}
function other() {
  const fileFilter = filter(file => file.stat.isFile());
  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join(`!${conf.paths.src}`, '/**/*.{scss,ts,html}')
  ])
  .pipe(fileFilter)
  .pipe(gulp.dest(conf.paths.dist));
}
