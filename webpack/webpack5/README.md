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

