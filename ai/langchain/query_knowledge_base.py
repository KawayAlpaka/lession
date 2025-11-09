import os
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
import requests


class DeepSeekRAGSystem:
    def __init__(self, persist_directory="./vector_db"):
        self.persist_directory = persist_directory
        # self.embeddings = HuggingFaceEmbeddings(
        #     model_name="GanymedeNil/text2vec-large-chinese",
        #     model_kwargs={'device': 'cpu'}
        # )
        self.embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2")
        self.vector_store = None
        self.qa_chain = None
        
        # DeepSeek API配置
        self.api_key = os.getenv("DEEPSEEK_API_KEY", "my DEEPSEEK_API_KEY")
        self.api_url = "https://api.deepseek.com/v1/chat/completions"
    
    def load_vector_store(self):
        """加载本地向量数据库"""
        if not os.path.exists(self.persist_directory):
            raise FileNotFoundError(f"向量数据库目录不存在: {self.persist_directory}")
        
        self.vector_store = FAISS.load_local(
            self.persist_directory, 
            self.embeddings, 
            allow_dangerous_deserialization=True
        )
        print("向量数据库加载成功")
    
    def call_deepseek_api(self, prompt, context):
        """调用DeepSeek API"""
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        # 构建提示词模板
        full_prompt = f"""基于以下上下文信息，回答问题。如果上下文中没有相关信息，请如实告知。

上下文：
{context}

问题：{prompt}

请根据上下文提供准确、有用的回答："""
        
        data = {
            "model": "deepseek-chat",
            "messages": [
                {
                    "role": "system", 
                    "content": "你是一个有帮助的AI助手，会根据提供的上下文信息准确回答问题。"
                },
                {
                    "role": "user", 
                    "content": full_prompt
                }
            ],
            "max_tokens": 2048,
            "temperature": 0.3
        }
        
        try:
            response = requests.post(self.api_url, headers=headers, json=data)
            response.raise_for_status()
            result = response.json()
            return result["choices"][0]["message"]["content"]
        except Exception as e:
            return f"API调用错误: {str(e)}"
    
    def create_retriever(self, k=3):
        """创建检索器"""
        if not self.vector_store:
            self.load_vector_store()
        
        retriever = self.vector_store.as_retriever(
            search_kwargs={"k": k}  # 返回最相关的k个文档
        )
        return retriever
    
    def rag_query(self, question, k=3):
        """执行RAG查询"""
        # 1. 检索相关文档
        retriever = self.create_retriever(k)
        # relevant_docs = retriever.get_relevant_documents(question)
        # relevant_docs = retriever._get_relevant_documents(question)
        relevant_docs = retriever.invoke(question)
        
        # 2. 合并检索到的文档内容
        context = "\n\n".join([doc.page_content for doc in relevant_docs])
        
        print(f"检索到 {len(relevant_docs)} 个相关文档片段")
        
        # 3. 调用DeepSeek API生成答案
        answer = self.call_deepseek_api(question, context)
        
        return {
            "question": question,
            "answer": answer,
            "source_documents": relevant_docs
        }
    
    def interactive_mode(self):
        """交互式问答模式"""
        print("=== DeepSeek RAG 问答系统 ===")
        print("输入 'quit' 或 '退出' 结束程序")
        
        while True:
            question = input("\n请输入您的问题: ").strip()
            
            if question.lower() in ['quit', '退出', 'exit']:
                print("再见！")
                break
            
            if not question:
                continue
            
            print("思考中...")
            result = self.rag_query(question)
            
            print(f"\n答案: {result['answer']}")
            print(f"\n来源文档: {len(result['source_documents'])} 个相关片段")

if __name__ == "__main__":
    # 初始化RAG系统
    rag_system = DeepSeekRAGSystem()
    
    try:
        # 测试查询
        test_question = "什么是RAG技术？"
        print(f"测试问题: {test_question}")
        
        result = rag_system.rag_query(test_question)
        print(f"答案: {result['answer']}")
        
        # 进入交互模式
        rag_system.interactive_mode()
        
    except Exception as e:
        print(f"系统错误: {e}")
        print("请检查向量数据库路径和API密钥配置")