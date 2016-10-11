require.config({
  baseUrl: "js",
  paths: {
    'ionic.bundle': 'http://cdn.bootcss.com/ionic/1.3.1/js/ionic.bundle',
    'cordova' : '../cordova',
    'app' : 'app',
    'controllers': 'controllers',
    'angular-cookies': '//cdn.bootcss.com/angular.js/1.5.8/angular-cookies.min',
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
    'angular-cookies': {
      deps: ['app']
    },
    'services': {
        deps: ['app']
    }

  },
  waitSeconds: 15
});

require(['ionic.bundle', 'app', 'controllers', 'services','angular-cookies'], function () {

  // require(['cordova']);

  return angular.bootstrap(document, ['starter']);
});

