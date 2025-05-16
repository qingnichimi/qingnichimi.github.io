@echo off
echo Starting deploy...

REM 构建项目
echo Starting build...
call npm run build


REM 添加 out 目录下的所有文件
echo add files...
git add ./out/

REM 提交更改
echo commit change...
git commit -m "Deploy to GitHub Pages"

REM 推送到 gh-pages 分支
echo push GitHub Pages...
git push origin HEAD:pages --force

echo deploy done!
pause 