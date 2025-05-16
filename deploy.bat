@echo off
echo Starting deploy...

REM 构建项目
echo Starting build...
call npm run build

REM 进入 out 目录
cd out

REM 初始化 git 仓库（如果不存在）
if not exist .git (
  echo init git repo...
  git init
)

REM 设置远程仓库（如果已存在则更新）
echo set remote repo...
if git remote | findstr "origin" >nul (
  git remote set-url origin https://github.com/qingnichimi/qingnichimi.github.io.git
) else (
  git remote add origin https://github.com/qingnichimi/qingnichimi.github.io.git
)

REM 添加所有文件
echo add file...
git add .

REM 提交更改
echo commit change...
git commit -m "Deploy to GitHub Pages"

REM 推送到 gh-pages 分支
echo push GitHub Pages...
git push origin HEAD:gh-pages --force

REM 返回上级目录
cd ..

echo deploy done!
pause 