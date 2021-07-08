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
