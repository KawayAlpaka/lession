# vscode开发环境部署(参考:https://blog.csdn.net/u011127019/article/details/73380654)

### 安装typescript
<pre><code>
npm install -g typescript
</code></pre>

### 验证是否安装成功
<pre><code>
tsc -v  
</code></pre>

### 生成任务 
<pre><code>
任务->配置生成默认任务->tsc
</code></pre>

### 启动任务
<pre><code>
Ctrl+Shift+B
</code></pre>

### 直接运行ts代码
<pre><code>
npm install -g ts-node
ts-node ./src/main.ts
</code></pre>

### 运行js目标代码
```
node ./out/main.js
```

### 启动webpack打包
```
npm run watch
```