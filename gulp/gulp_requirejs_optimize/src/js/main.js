var requirejs = {
    baseUrl: "js",
    paths: {
        'jquery': '../lib/jquery',
        'test1': 'test1',
        'app' : 'app'
    },
    shim: {
        'app': {
            exports: 'app'
        },
        'test1': {
            deps: ['app']
        }
    },
    waitSeconds: 15
};

require.config(requirejs);

require([
    // '../lib/jquery',
    'jquery',
    'app','test1'], function (
    jquery,
    app) {
    console.log("main");
    console.log(app);
    $(function () {
        console.log("$");
    });
    return {};
});

