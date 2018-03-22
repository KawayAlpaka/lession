// 1、some-webpack-plugin.js 文件（独立模块）
// 2、模块对外暴露的 js 函数
function SomewebpackPlugin(pluginOpions) {
    // console.log("pluginOpions");
    // console.log(pluginOpions);
    // this.options = pluginOptions;
}
// 3、原型定义一个 apply 函数，并注入了 compiler 对象
SomewebpackPlugin.prototype.apply = function (compiler) {
    console.log("apply");
    const pluginName = "SomewebpackPlugin";
    // console.log(compiler);
    // 4、挂载 webpack 事件钩子（这里挂载的是 emit 事件）
    // compiler.plugin('emit', function (compilation, callback) {
    //     // ... 内部进行自定义的编译操作
    //     // 5、操作 compilation 对象的内部数据
    //     console.log("emit");
    //     // console.log(compilation);
    //     // 6、执行 callback 回调
    //     callback();
    // });
    // console.log(compiler.hooks);
    compiler.hooks.entryOption.tap(pluginName, params => {
        console.log('compiler.hooks.entryOption.tap');
        // console.log(params);
      })
    compiler.hooks.compile.tap(pluginName, params => {
        console.log('compiler.hooks.compile.tap');
        // console.log(arguments);
      })
};
// 暴露 js 函数
module.exports = SomewebpackPlugin;