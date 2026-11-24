@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ============================================
echo   刘启征 · 个人网址  一键更新
echo ============================================
echo.
echo 1/3 检查改动…
git status --short
echo.
echo 2/3 提交（如果没有改动会自动跳过）…
git add -A
git commit -m "update: %date% %time%"
echo.
echo 3/3 推送到 GitHub（会弹一次浏览器登录，点允许即可）…
git push
echo.
echo 完成。等 1~2 分钟，线上会自动更新：
echo   https://lin-qing-zrin.github.io
echo.
pause
