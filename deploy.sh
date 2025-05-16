#!/bin/bash

# 构建项目
npm run build

# 进入 out 目录
cd out

# 初始化 git 仓库（如果不存在）
if [ ! -d .git ]; then
  git init
fi

# 设置远程仓库（如果已存在则更新）
if git remote | grep -q "origin"; then
  git remote set-url origin https://github.com/qingnichimi/qingnichimi.github.io.git
else
  git remote add origin https://github.com/qingnichimi/qingnichimi.github.io.git
fi

# 添加所有文件
git add .

# 提交更改
git commit -m "Deploy to GitHub Pages"

# 推送到 gh-pages 分支
git push origin HEAD:main --force

# 返回上级目录
cd .. 