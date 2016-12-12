var path = require('path');

var sourcePath = path.join('.', 'static_src');
var rootPath = path.join('.', 'dist');
var distPath = path.join(rootPath, 'static');

var prod = process.env.NODE_ENV === 'production';

module.exports = {
    prod: prod,

    paths: {
        templates: path.join('.', 'templates'),
        jsSrc: path.join(sourcePath, 'js'),
        sass: path.join(sourcePath, 'scss'),
        svg: path.join(sourcePath, 'svg'),
        imagesSrc: path.join(sourcePath, 'images'),
        js: rootPath,
        css: rootPath,
        appName: 'site.js',
        www: rootPath,
    },

    PlzOptions: {
        minifier: prod,
        mqpacker: false,
        filters: false,
        rem: true,
        pseudoElements: true,
        opacity: true,
        autoprefixer: {
            browsers: ['ie 8', 'ie 9', '> 1%'],
        },
    },
};
