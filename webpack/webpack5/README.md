## 主要功能说明

### 使用babel
安装必要工具:
- ```@babel/core```、```@babel/preset-env```、```babel-loader```
- 配置 ```.babelrc``` 的 ```presets```
- 配置 webpack 的 loader

### 多html入口文件
使用多个 ```HtmlWebpackPlugin```即可
```js
new HtmlWebpackPlugin({
  template: path.join(srcPath,"template","index.html"),
  filename:"index.html"
}),
new HtmlWebpackPlugin({
  template: path.join(srcPath,"template","list.html"),
  filename:"list.html"
})
```

### 使用dev-server
最简单的使用方法:
- 安装```webpack-dev-server```
- 配置脚本```"start": "webpack serve --open"```

### 使用CleanWebpackPlugin
最简单的使用方法:
- 安装```clean-webpack-plugin```
- 加入到配置中

### 使用less
- 安装```less```、```less-loader``` 、```css-loader``` 、```style-loader``` 
- 配置 webpack 的 loader


### 使用DefinePlugin
```js
new webpack.DefinePlugin({
  IsHappy:true
})
```
好处是打包压缩可以根据分支化简代码


### webpack-merge合并配置
```js
const { merge } = require('webpack-merge')
const commonConfig = require("./webpack.common")
const Config = merge(commonConfig,{
  mode:"production"
});
```


### 使用mini-css-extract-plugin 
生产环境下，生成.css文件
1. 安装 mini-css-extract-plugin
2. 配置 rules部分,把style-loader替换成MiniCssExtractPlugin.loader
3. plugins中添加```new MiniCssExtractPlugin({filename:"css/[name].[contenthash:4].css"})```


### 使用CssMinimizerPlugin压缩css
注意他是要写到  optimization.minimizer 中
```js
optimization: {
  minimizer:[
    new CssMinimizerPlugin()
  ] 
}
```

### 使用分包功能
只要配置 optimization.splitChunks 即可，但要配置要点 在于 test和minChunks参数，注意看demo


### 使用 TerserPlugin 压缩js
只要配置下面的就行
```js
optimization: {
  minimizer:[
    new TerserPlugin({})
  ] 
}
```


### 懒加载模块
vue和react的懒加载，用的也就是这个功能。
```js
import("./common/lazy").then((lazy)=>{
  console.log(lazy);
  console.log(lazy.sub(10,5)); 
});
```


### 使用url-loader + file-loader 打包图片
1. 安装 loader
2. 配置 rules 
3. 直接 ```import img from "path/to/image.png"```

### 使用IgnorePlugin忽略指定文件的打包
以moment举例，需要去研究moment的结果
```js
plugins: [
  new webpack.IgnorePlugin({
    resourceRegExp: /^\.\/locale$/,
    contextRegExp: /moment$/,
  }),
],
// which means "any require statement matching './locale' from any directories ending with 'moment' will be ignored
```
上面忽略以后，需要手动引入需要的语言包
```js
import moment from "moment"
import "moment/locale/zh-cn"
moment.locale("zh-cn");
console.log(moment.months());
```


### module.noParse 避免重复打包
```js
module: {
  noParse: /\.min\.js$/
}
```

