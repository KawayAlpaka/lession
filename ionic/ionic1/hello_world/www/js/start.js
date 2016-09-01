require.config({
  baseUrl: "js",
  paths: {
    'ionic.bundle': 'http://cdn.bootcss.com/ionic/1.3.1/js/ionic.bundle.min',
    'cordova' : '../cordova',
    'app' : 'app',
    'controllers': 'controllers',
    'services': 'services'
  },
  shim: {
    'ionic.bundle': {
        exports: 'angular'
    },
    'app': {
        deps: ['ionic.bundle']
    },
    'controllers': {
        deps: ['app']
    },
    'services': {
        deps: ['app']
    }
  },
  waitSeconds: 15
});

require(['ionic.bundle', 'app', 'controllers', 'services'], function () {

  require(['cordova']);

  return angular.bootstrap(document, ['starter']);
});

