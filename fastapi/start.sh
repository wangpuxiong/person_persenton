#!/bin/bash

# 定义虚拟环境目录路径（可根据需要修改）
VENV_DIR="venv"  # 虚拟环境文件夹名

# 检查虚拟环境是否存在
if [ ! -d "$VENV_DIR" ]; then
    echo "虚拟环境 $VENV_DIR 不存在，正在创建..."
    python -m venv "$VENV_DIR"
    if [ $? -ne 0 ]; then
        echo "错误：创建虚拟环境失败！请确保已安装Python 3.10+"
        exit 1
    fi
fi

# 激活虚拟环境
echo "激活虚拟环境..."
source "$VENV_DIR/bin/activate"

# 检查激活是否成功
if [ $? -ne 0 ]; then
    echo "错误：激活虚拟环境失败！"
    exit 1
fi

# 安装依赖
echo "检查并安装依赖..."
pip install -e .

if [ $? -ne 0 ]; then
    echo "错误：安装依赖失败！"
    exit 1
fi

# 启动FastAPI服务器
echo "启动FastAPI服务..."
python server.py --port 9202 --reload true

# 退出虚拟环境（如果服务器停止的话）
deactivate
echo "服务已停止，虚拟环境已退出"

