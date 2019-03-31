const config = require('../config');
const gulp = require('gulp');
var path = require('path');

gulp.task('templates',function(){
    return gulp.src(path.join( config.paths.templates, '**', "*.html" ))
      .pipe(gulp.dest("dist"));
});
