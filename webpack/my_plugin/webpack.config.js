const path = require('path');
const MyExampleWebpackPlugin = require('./my-plugin/MyExampleWebpackPlugin');
const SomewebpackPlugin = require('./my-plugin/SomewebpackPlugin');


module.exports = {
    entry: {
        app:"./src/app.js"
    },
    plugins: [
        new SomewebpackPlugin({
            h:"haha"
        })
    ],
    module: {},
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',

    },
    mode: 'development'
}