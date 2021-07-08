## 主要功能说明

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
