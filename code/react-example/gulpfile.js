var gulp = require('gulp');
var connect = require('gulp-connect');
var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');

// Initialize watch tasks
gulp.task('watch', ['run'], function() {
  gulp.watch(['./src/**/*'], ['build']);
});

// Build files for distribution
gulp.task('build', function() {
  return gulp.src('./src/js/App.js')
      .pipe(webpack(webpackConfig))
      .pipe(gulp.dest('dist/'))
      .pipe(connect.reload());
});

// Run example server
gulp.task('run', ['build'], function(){
  connect.server({
    root: './dist',
    port: 8080,
    livereload: true
  });
});

gulp.task('default', ['watch']);

