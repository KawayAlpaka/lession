## 测试命令
### 测试获取数据
```
ab -n 100 -c 100 http://localhost:8000/data
```
### 上传文件
```
ab -n 100 -c 100 -T 'application/json' -p ./data/data.txt http://localhost:8000/
```