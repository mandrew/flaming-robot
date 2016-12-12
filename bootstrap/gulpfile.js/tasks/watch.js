var gulp = require("gulp");
var config = require("../config");
var path = require("path");
var bs = require('browser-sync').create('main');

gulp.task('watch', ['build'], function() {
    bs.init({
        open: false,
        server: config.paths.www,
        //proxy: 'localhost:8080'
    });

    var templateReload = [
        path.join(config.paths.templates, '**', '*.html'),
    ];

    gulp.watch(templateReload, ['templates']);
    gulp.watch(path.join(config.paths.svg, '**', '*.svg'), ['svg']);
    gulp.watch(path.join(config.paths.imagesSrc, '*.{png,gif,jpg,jpeg,svg}'), ['images']);
    gulp.watch(path.join(config.paths.sass, '**', '*.scss'), ['css']);
    gulp.watch(path.join(config.paths.jsSrc, '**', '*.js'), ['js']);
    gulp.watch(path.join(config.paths.www, '**', '*.html'), bs.reload);
});
