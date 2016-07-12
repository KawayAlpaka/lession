require.config({
    baseUrl: "scripts",
    paths: {
        'jquery': 'lib/jquery.min'
    },
    map: {
        // '*' means all modules will get 'jquery-private'
        // for their 'jquery' dependency.
        '*': { 'jquery': 'jquery-private' },

        // 'jquery-private' wants the real jQuery module
        // though. If this line was not here, there would
        // be an unresolvable cyclic dependency.
        'jquery-private': { 'jquery': 'jquery' }
    },
    waitSeconds: 15
});

(function () {
    require(['jquery'], function () {
        console.log(window);
    });
    require(['jquery'], function( $ ) {
        console.log( $ ); // OK
    });

    require(['jquery'], function( jq ) {
        console.log( jq ); // OK
    });

    require(['jquery'], function( ) {
        console.log( $ ); // UNDEFINED!
    });
})();

