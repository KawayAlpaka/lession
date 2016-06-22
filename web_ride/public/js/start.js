require.config({
    baseUrl: "js",
    paths: {
        'angular': '../lib/angular-1.5.0',
        'ui-router': '../lib/angular-ui-router',
        'jquery': '../lib/jquery',
        'ng-bootstrap': '../lib/ui-bootstrap-tpls-1.2.1',
        'lodash': '../lib/lodash'
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
        'rap':{
            deps:['angular']
        }
    },
    waitSeconds: 15
});

require(['jquery', 'app', 'angular', 'ui-router', 'router', 'controller',
    'lodash','ng-bootstrap'], function ($, app, angular) {
    return angular.bootstrap(document, ['myApp']);
});

