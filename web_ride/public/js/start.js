require.config({
    baseUrl: "js",
    paths: {
        'angular': '//cdn.bootcss.com/angular.js/1.5.8/angular',
        'ui-router': '//cdn.bootcss.com/angular-ui-router/0.3.1/angular-ui-router',
        'statehelper': '//cdn.bootcss.com/angular-ui-router.statehelper/1.3.1/statehelper',
        'jquery': '//cdn.bootcss.com/jquery/3.1.1/jquery',
        'ng-bootstrap': '//cdn.bootcss.com/angular-ui-bootstrap/2.2.0/ui-bootstrap-tpls',
        'angular-cookies': '//cdn.bootcss.com/angular.js/1.5.8/angular-cookies',
        'lodash': '//cdn.bootcss.com/lodash.js/4.16.4/lodash',
        'socket': '//cdn.bootcss.com/socket.io/1.5.0/socket.io',
        // 'bootstrap': '//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min',
        'angular-animate': '//cdn.bootcss.com/angular.js/1.5.8/angular-animate',
        'WebUploader': '../lib/webuploader',
        'env': 'env'
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

