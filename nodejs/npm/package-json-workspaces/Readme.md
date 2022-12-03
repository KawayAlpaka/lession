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
- 其中 ```tsconfig.json``` 中的 paths 
  - 只能给编辑器代码提示用，实际无法运行。
  - 如果需要访问路径下的其他模块，需要写成通配符的形式。
  - 在使用workspaces方案后，这个就可以不用了

- 如果要运行，需要在 ```package.json```中添加 ```workspaces```的设置，然后用```npm init -w```初始化软连接到node_modules中

- 使用 ```workspaces``` 方案后，天然就支持深层引入的方式。
```js
import { getAge } from "module-a/lib/age"
```

- 子模块的 ```package.json``` 不能删除，删除后就不会生成软连接到 ```node_modules```中

- 软连接的文件夹名，是根据子模块 ```package.json``` 的 ```name```生成的。


