@echo off

REM 构建项目
call npm run build

REM 进入 out 目录
cd out

REM 初始化 git 仓库（如果不存在）
if not exist .git (
  git init
)

REM 设置远程仓库（如果已存在则更新）
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

REM 添加所有文件
git add .

REM 提交更改
git commit -m "Deploy to GitHub Pages"

REM 推送到 gh-pages 分支
git push origin HEAD:gh-pages --force

REM 返回上级目录
cd .. 