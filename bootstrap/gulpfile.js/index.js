require('./tasks/watch');
require('./tasks/css');
require('./tasks/js');
require('./tasks/svg');
require('./tasks/templates');

var gulp = require('gulp');

gulp.task('build', ['js', 'css', 'svg', 'templates']);

gulp.task('default', ['build']);
