
const { merge } = require('webpack-merge')
const commonConfig = require("./webpack.common")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const { GenerateSW } = require('workbox-webpack-plugin');

const Config = merge(commonConfig, {
  mode: "production",
  module: {
    rules: [{
      test: /\.less$/,
      use: [
        { loader: MiniCssExtractPlugin.loader },
        { loader: "css-loader" },
        { loader: "less-loader" },
      ],
      exclude: /node_modules/
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:4].css"
    }),
    new GenerateSW ({
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  optimization: {
    // minimize: true,
    minimizer: [
      new TerserPlugin({
        // test: /^((?!min\.js).)*$/, // 匹配不包含 min.js 的文件，这样不行，他还会去压缩css，傻逼吗
      }),
      new CssMinimizerPlugin()
    ],
    splitChunks: {
      chunks: "all",
      /**
     * initial 入口chunk，对于异步导入的文件不处理
        async 异步chunk，只对异步导入的文件处理
        all 全部chunk
      */
      cacheGroups: {
        // 第三方模块
        vendor: {
          name: 'vendor', // chunk 名称
          priority: 1, // 权限更高，优先抽离，重要！！！
          test: /node_modules/,
          minSize: 0,  // 大小限制
          minChunks: 1  // 最少复用过几次
        },
        // 公共的模块
        common: {
          name: 'common', // chunk 名称
          priority: 0, // 优先级
          minSize: 0,  // 公共模块的大小限制
          minChunks: 2  // 公共模块最少复用过几次
        }
      }
    }
  }
});

module.exports = Config;
