@echo off
echo 正在配置 Git Bash 的 cs 别名...

REM 检查 Git Bash 是否安装
if exist "C:\Program Files\Git\bin\bash.exe" (
    set GIT_BASH_PATH=C:\Program Files\Git\bin\bash.exe
) else if exist "C:\Program Files (x86)\Git\bin\bash.exe" (
    set GIT_BASH_PATH=C:\Program Files (x86)\Git\bin\bash.exe
) else (
    echo 错误：未找到 Git Bash，请确保已安装 Git for Windows
    pause
    exit /b 1
)

echo 找到 Git Bash 路径: %GIT_BASH_PATH%

REM 创建 .bashrc 文件（如果不存在）
echo 正在创建或更新 .bashrc 文件...

REM 使用 Git Bash 来创建别名
"%GIT_BASH_PATH%" -c "echo 'alias cs=\"cursor\"' >> ~/.bashrc"

echo.
echo 配置完成！请重新打开 Git Bash 或运行以下命令使配置生效：
echo source ~/.bashrc
echo.
echo 然后您就可以使用 'cs .' 来启动 Cursor 了！
pause 