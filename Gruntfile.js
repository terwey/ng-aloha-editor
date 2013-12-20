'use strict';

module.exports = function (grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                theme: 'simple',
                options: {
                    exclude: 'libs, node_modules',
                    paths: './',
                    outdir: 'docs/'

                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
}