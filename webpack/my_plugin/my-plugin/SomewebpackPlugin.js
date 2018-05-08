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
    var i = 0;
    compiler.hooks.done.tap(pluginName, params => {
        console.log('done');
        console.log(++i);
    })
    // compilation（'编译器'对'编译ing'这个事件的监听）
    compiler.hooks.compilation.tap(pluginName, function (compilation) {
        console.log("The compiler is starting a new compilation...");
        // 在compilation事件监听中，我们可以访问compilation引用，它是一个代表编译过程的对象引用
        // 我们一定要区分compiler和compilation，一个代表编译器实体，另一个代表编译过程
        // optimize('编译过程'对'优化文件'这个事件的监听)
        // compilation.plugin("optimize", function () {
        //     console.log("The compilation is starting to optimize files...");
        // });
        compilation.hooks.finishModules.tap(pluginName,(modules)=>{
            console.log("finishModules");
        });
    });
};
// 暴露 js 函数
module.exports = SomewebpackPlugin;