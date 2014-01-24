// Karma configuration
// Generated on Wed Dec 18 2013 14:43:05 GMT+0100 (CET)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/requirejs/require.js',
      'bower_components/jquery/jquery.js',
      'test/*.spec.js',
      'libs/alohaeditor-0.23.26/aloha/lib/vendor/jquery-1.7.2.js',
      'test/test-configuration.js',
      'libs/alohaeditor-0.23.26/aloha/lib/aloha.js',
      'ng-aloha-editor.js',
    ],


    // list of files to exclude
    exclude: [
      
    ],

    preprocessors: {
      '*.js': 'coverage'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['Chrome'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    coverageReporter: {
      type: 'lcov',
      dir: 'out/coverage'
    }
  });
};
