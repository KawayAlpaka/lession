require.config({
    baseUrl: "js",
    paths: {
        // 'angular': '../lib/angular-1.5.7',
        'angular': '//cdn.bootcss.com/angular.js/1.5.8/angular',
        'ui-router': '../lib/angular-ui-router',
        'statehelper': '../lib/statehelper',
        'jquery': '../lib/jquery',
        'ng-bootstrap': '../lib/ui-bootstrap-tpls-1.2.1',
        'angular-cookies': '../lib/angular-cookies',
        'lodash': '../lib/lodash',
        'env': 'env',
        'WebUploader': 'http://cdn.staticfile.org/webuploader/0.1.5/webuploader',
        'socket': '../lib/socket.io',
        'angular-animate': '//cdn.bootcss.com/angular.js/1.5.8/angular-animate'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'ui-router': {
            deps: ['angular']
        },
        'ng-bootstrap': {
            deps: ['angular']
        },
        'angular-cookies': {
            deps: ['angular']
        },
        'angular-animate': {
            deps: ['angular']
        },
        'rap':{
            deps:['angular']
        },
        'statehelper': {
            deps: ['ui-router']
        }
    },
    waitSeconds: 15
});

require(['jquery', 'app', 'angular', 'ui-router','angular-cookies','angular-animate', 'router','common','api','model','factory','directive' ,'controller',
    'lodash','ng-bootstrap','statehelper','socket','env'], function ($, app, angular) {
    return angular.bootstrap(document, ['myApp']);
});

