python -m venv rag_env
source rag_env/bin/activate  # Linux/Mac
# rag_env\Scripts\activate  # Windows

pip install langchain langchain-text-splitters langchain-community bs4 -i https://pypi.tuna.tsinghua.edu.cn/simple 

deactivate

-i https://pypi.tuna.tsinghua.edu.cn/simple 


pip freeze > requirements.txt


# 环境搭建踩坑
- 需要安装 c++ 生成工具
- 可以的话，用 python3.10
- 