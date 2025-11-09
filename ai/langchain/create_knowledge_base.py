import os

from langchain_community.document_loaders import TextLoader, PyPDFLoader, DirectoryLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
# from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
# from langchain.schema import Document

class KnowledgeBaseCreator:
    def __init__(self, data_path, persist_directory="./vector_db"):
        self.data_path = data_path
        self.persist_directory = persist_directory
        # self.embeddings = HuggingFaceEmbeddings(
        #     model_name="GanymedeNil/text2vec-large-chinese",
        #     model_kwargs={'device': 'cpu'}
        # )
        self.embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2")
    
    def load_documents(self):
        """加载文档数据"""
        documents = []
        
        # 支持多种格式的文档加载
        if os.path.isfile(self.data_path):
            if self.data_path.endswith('.pdf'):
                loader = PyPDFLoader(self.data_path)
            else:
                loader = TextLoader(self.data_path, encoding='utf-8')
            documents = loader.load()
        elif os.path.isdir(self.data_path):
            # 加载目录下的所有文本和PDF文件
            text_loader = DirectoryLoader(self.data_path, glob="**/*.txt", 
                                         loader_cls=TextLoader)
            pdf_loader = DirectoryLoader(self.data_path, glob="**/*.pdf", 
                                       loader_cls=PyPDFLoader)
            
            text_docs = text_loader.load()
            pdf_docs = pdf_loader.load()
            documents = text_docs + pdf_docs
        
        print(f"成功加载 {len(documents)} 个文档")
        return documents
    
    def split_documents(self, documents):
        """文档分割处理"""
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=500,      # 每个文本块的大小
            chunk_overlap=50,    # 块之间的重叠大小
            length_function=len,
            separators=["\n\n", "\n", "。", "！", "？", "；", "，", " ", ""]
        )
        
        chunks = text_splitter.split_documents(documents)
        print(f"文档分割为 {len(chunks)} 个文本块")
        return chunks
    
    def create_vector_store(self, chunks):
        """创建向量数据库"""
        if not chunks:
            raise ValueError("没有可处理的文档内容")
        
        # 使用FAISS创建向量存储
        vector_store = FAISS.from_documents(chunks, self.embeddings)
        
        # 持久化到本地
        vector_store.save_local(self.persist_directory)
        print(f"向量数据库已保存到: {self.persist_directory}")
        
        return vector_store
    
    def run(self):
        """运行知识库创建流程"""
        print("开始创建知识库...")
        
        # 1. 加载文档
        documents = self.load_documents()
        if not documents:
            print("未找到可处理的文档")
            return None
        
        # 2. 文档分割
        chunks = self.split_documents(documents)
        
        # 3. 创建向量存储
        vector_store = self.create_vector_store(chunks)
        
        print("知识库创建完成！")
        return vector_store

if __name__ == "__main__":
    # 配置参数
    DATA_PATH = "./knowledge_data"  # 文档路径（可以是文件或目录）
    PERSIST_DIR = "./vector_db"
    
    # 创建知识库
    creator = KnowledgeBaseCreator(DATA_PATH, PERSIST_DIR)
    vector_store = creator.run()