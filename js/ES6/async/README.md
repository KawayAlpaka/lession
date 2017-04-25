npm install --save-dev babel-cli

npm install --save-dev babel-preset-es2015 babel-preset-es2017

.babelrc
{"presets": ["es2015","es2017"] }

babel-node test1.js
或
pm2 start babel-node-start.js   //pm2配置文件(pm2.json)还不会用
