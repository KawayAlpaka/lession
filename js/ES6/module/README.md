### NODE环境

The ESM module loader is experimental（node9以后有了这个功能，但是到node10为止，还是实验性的）

所有的js文件扩展名为 mjs
```
node --experimental-modules ./main.mjs
```

### 浏览器环境

```
<script type="module" src="./main2.js"></script>
```

浏览器中需要启动web服务器

安装 live-server
```
npm install -g live-server
```

启动 live-server
```
live-server
```