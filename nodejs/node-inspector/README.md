node-inspector没试验成功，应该是过时了
```
npm install -g node-inspector
```

可以使用node自带的工具 
```
node --inspect app.js
```
然后用chrome打开(后面的id是动态生成的)
```
chrome-devtools://devtools/bundled/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9229/5b2e3843-5073-448a-8105-8d408c11d235
```