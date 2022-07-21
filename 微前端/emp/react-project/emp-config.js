const path = require('path')
const packagePath = path.join(path.resolve('./'), 'package.json')
const { dependencies } = require(packagePath)

const port = 8002
module.exports = {

  /**
 * Webpack 配置入口
 * @param {*} param0
 * @returns
 */
  webpack({ webpackEnv, config }) {
    console.log('webpack', webpackEnv)
    // 配置 index.html
    config.plugin('html').tap(args => {
      args[0] = {
        ...args[0],
        ...{
          // head 的 title
          title: 'EMP-Base-Project',
          // 远程调用项目的文件链接
          files: {},
        },
      }
      return args
    })

    return {
      devServer: {
        port: port,
      },
    }
  },


  /**
   * 打包相对路径配置
   */
  moduleGenerator({ webpackEnv }) {
    console.log('moduleGenerator', webpackEnv)
    return webpackEnv === 'development' ? '/' : `http://localhost:${port}/`
  },

  /**
   * moduleFederation 配置
   */
  moduleFederation: {
    /**
     * 项目名
     */
    name: 'empReactProject',

    /**
     * 当前暴露模块索引文件
     */
    filename: 'emp.js',

    /**
     * 引入远程模块入口
     * "本项目引用模块命名空间":"远程模块项目名@项目地址"
     */
    remotes: {
      "@emp/react-base": `empReactBase@http://localhost:8001/emp.js`
    },

    /**
     * 暴露可以调用模块
     * "被远程引用时的路径":"本项目相对路径"
     */
    exposes: {
      "./components/Hello": "src/components/Hello",
      "./helper": "src/helper"
    },

    /**
     * 共享 lib
     */
    /* shared: {
      react: {singleton: true, requiredVersion: false},
      'react-dom': {singleton: true, requiredVersion: false},
    }, */
    /* shared: {
      react: {requiredVersion: '^17.0.1'},
      'react-dom': {requiredVersion: '^17.0.1'},
    }, */
    // shared: Object.assign({}, shareByVersion('react'), shareByVersion('react-dom')),
  },
}
