## 参考资料(https://www.ibm.com/developerworks/cn/web/wa-lo-webassembly-status-and-reality/index.html)

### 安装assemblyscript环境(https://github.com/AssemblyScript/assemblyscript#installation)

### 编译
```
asc f.ts -o f.wasm
```

### 启动web
```
live-server
```

### 注意  
1、安装时要按步骤跑完   
2、参考资料中示例代码中 ```mod.instance.f(6)``` 不能运行，要修改为 ```mod.instance.exports.f(6)```   
