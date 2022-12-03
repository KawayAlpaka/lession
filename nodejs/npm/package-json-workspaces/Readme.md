# 注意
需要nodejs 16 以上

## 初始化
首次要运行一次
```
npm init -w
```
对应的文件更改后```npm i```就能初始化
```
npm i 
```

体验
```
npm run test
```



## 关键配置说明
- 其中 ```tsconfig.json``` 中的 paths 只能给编辑器代码提示用，实际无法运行

- 如果要运行，需要在 ```package.json```中添加 ```workspaces```的设置，然后用```npm init -w```初始化软连接到node_modules中

