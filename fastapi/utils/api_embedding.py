import logging
import os
import re
from openai import AsyncOpenAI
import asyncio
from dotenv import load_dotenv
from utils.get_env import get_comparegpt_api_url_env
# 加载.env文件
load_dotenv()

logger = logging.getLogger(__name__)

class EmbeddingModel:
    def __init__(self):
        # 使用环境变量中的OpenAI API密钥
        # openai_api_key = os.getenv("OPENAI_API_KEY")
        # if not openai_api_key:
        #     logger.error("OPENAI_API_KEY environment variable not set")
        #     raise ValueError("OPENAI_API_KEY environment variable is required")
       
        self.model = "text-embedding-3-small"    
    
    async def get_embedding(self, text: str,api_key: str):
        client = AsyncOpenAI(           
            base_url=get_comparegpt_api_url_env(),
            api_key=api_key
        )
        response = await client.embeddings.create(
            model=self.model,
            input=text
        )
        # logger.info(f"response: {response}")

        # 提取embedding数据
        if hasattr(response, 'data') and response.data:
            return response.data[0].embedding
        else:
            logger.error("No embedding data found in response")
            return []   

    
# if __name__ == "__main__":


#     print("\n尝试实际API调用 (需要设置OPENAI_API_KEY):")
#     async def test():
#         try:
#             model = EmbeddingModel()

#             # 获取embedding向量（只返回向量数据）
#             embeddings = await model.get_embedding("Hello, world!")
#             print(f"Embedding result: {embeddings}")

#         except Exception as e:
#             print(f"Test failed: {e}")
#             print("Note: Make sure OPENAI_API_KEY is set in your environment variables")

#     asyncio.run(test())


