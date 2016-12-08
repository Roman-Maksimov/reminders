var webpackConfig = require('./config/webpack/dev-server.js');
module.exports=function(config) {
    config.set({
        frameworks: ['mocha'],
        browsers: ['PhantomJS'],
        client: {
            captureConsole: true,
            mocha: {
                bail: true
            }
        },
        coverageReporter: {
            dir:'tmp/coverage/',
            reporters: [
                { type:'html', subdir: 'report-html' },
                { type:'lcov', subdir: 'report-lcov' }
            ],
            instrumenterOptions: {
                istanbul: { noCompact:true }
            }
        },
        files: [
            'src/**/*.spec.js',
            'tests/**/*.spec.js',
            'node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js',
        ],
        frameworks: [ 'chai', 'jasmine' ],
        reporters: ['progress', 'mocha', 'coverage'],
        preprocessors: {
            'src/**/*.spec.js': ['webpack', 'sourcemap'],
            'tests/**/*.spec.js': ['webpack', 'sourcemap']
        },
        plugins: [
            'karma-jasmine', 'karma-mocha',
            'karma-chai', 'karma-coverage',
            'karma-webpack', 'karma-phantomjs-launcher',
            'karma-mocha-reporter', 'karma-sourcemap-loader'
        ],
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo:true
        }
    });
};