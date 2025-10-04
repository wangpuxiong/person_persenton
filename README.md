# Presenton

Presenton是一个演示文稿生成和管理系统，包含前端Next.js应用和后端FastAPI服务。

## 项目结构

本项目包含两个主要部分：

1. **前端 (Next.js)** - 位于 `nextjs/` 目录
2. **后端 (FastAPI)** - 位于 `fastapi/` 目录

## 部署说明

> **重要提示**：本项目将直接部署，不使用Docker、Nginx或MCP服务器。

### 后端部署 (FastAPI - 9202端口)

1. 确保安装了Python 3.10+ 和 pip

2. 进入fastapi目录：
   ```bash
   cd servers/fastapi
   ```

3. 创建虚拟环境并激活：
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   # 或在Windows上：
   # venv\Scripts\activate
   ```

4. 安装依赖：
   ```bash
   pip install -e .
   ```

5. 启动后端服务（9202端口）：
   ```bash
   python server.py --port 9202
   ```
   或使用提供的启动脚本：
   ```bash
   chmod +x start.sh
   ./start.sh
   ```

### 前端部署 (Next.js - 9201端口)

1. 确保安装了Node.js 16+ 和 npm

2. 进入nextjs目录：
   ```bash
   cd servers/nextjs
   ```

3. 安装依赖：
   ```bash
   npm install
   ```

4. 构建项目：
   ```bash
   npm run build
   ```

5. 启动前端服务（9201端口）：
   ```bash
   PORT=9201 npm start
   ```

## 环境变量配置

### 后端环境变量

后端支持以下环境变量配置（可通过.env文件或系统环境变量设置）：

- `APP_DATA_DIRECTORY` - 应用数据存储目录（默认在servers/app_data）
- `USER_CONFIG_PATH` - 用户配置文件路径
- `LLM` - 默认LLM提供商（如'openai'）
- `OPENAI_API_KEY` - OpenAI API密钥
- `OPENAI_MODEL` - OpenAI模型名称
- `ANTHROPIC_API_KEY` - Anthropic API密钥
- `ANTHROPIC_MODEL` - Anthropic模型名称
- `OLLAMA_URL` - Ollama服务URL
- `OLLAMA_MODEL` - Ollama模型名称
- `CUSTOM_LLM_URL` - 自定义LLM服务URL
- `CUSTOM_LLM_API_KEY` - 自定义LLM API密钥
- `IMAGE_PROVIDER` - 图像提供商

### 前端环境变量

前端支持以下环境变量配置：

- `USER_CONFIG_PATH` - 用户配置文件路径
- `CAN_CHANGE_KEYS` - 是否允许用户更改密钥
- `DISABLE_ANONYMOUS_TELEMETRY` - 是否禁用匿名遥测

## 重要说明

- 项目将使用相对路径存储数据，确保在不同服务器上部署时的一致性
- 前端服务将运行在9201端口，后端服务运行在9202端口
- 数据将默认存储在servers/app_data目录下
- 数据库使用SQLite，存储在app_data/fastapi.db

## 开发模式

### 后端开发模式

```bash
python server.py --port 9202 --reload true
```

### 前端开发模式

```bash
PORT=9201 npm run dev
```