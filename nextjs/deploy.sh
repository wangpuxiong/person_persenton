#!/bin/bash

# 设置脚本在执行过程中若有任何错误立即退出
set -e

# 打印当前目录，用于调试
echo "当前目录: $(pwd)"

# 检查npm是否已安装
if ! command -v npm &> /dev/null
then
    echo "错误: npm 未安装，请先安装Node.js和npm"
    exit 1
fi

# 检查pm2是否已安装
if ! command -v pm2 &> /dev/null
then
    echo "警告: pm2 未安装，正在尝试安装..."
    npm install -g pm2
    if [ $? -ne 0 ]
    then
        echo "错误: 安装pm2失败，请手动安装后再运行此脚本"
        exit 1
    fi
fi

# 构建项目
echo "正在构建项目..."
npm run build

# 检查构建是否成功
if [ $? -ne 0 ]
then
    echo "错误: 项目构建失败，请检查错误信息"
    exit 1
fi

echo "成功：项目构建完成，请运行启动"
