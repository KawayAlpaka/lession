### 参考资料(https://segmentfault.com/a/1190000014208777)

### 安装环境
克隆emsdk仓库，并执行安装
```
git clone https://github.com/juj/emsdk.git
```
定位到emsdk文件夹
```
cd emsdk
```
执行 update(参考资料中说要执行```emsdk update```，但实际不行，可能是版本问题)
```
git pull
```
安装各种工具
```
emsdk install latest
```
生成 ~/.emscripten 文件，激活配置
```
emsdk activate latest
```
运行emsdk_env.bat
```
emsdk_env.bat
```
测试安装情况
```
emcc -v
```

### 编译index.c文件
```
emcc index.c -s WASM=1 -O3 -o index.js
```

### web中测试
```
live-server
```

### 注意
环境变量配置那一步太麻烦，只是体验一下编译过程，配置临时环境变量，到emsdk下运行emcmdprompt.bat
```
cd emsdk
emcmdprompt.bat
```
