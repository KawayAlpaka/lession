module.exports =  function(buildDir){
    return {
        path: buildDir,
        // publicPath: '../../../../build/',
        publicPath: '',
        filename: 'js/[name].[hash].js',
        // chunkFilename: '[id].bundle.js',
    };
};