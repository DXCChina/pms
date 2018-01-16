set startdir=%cd%
cd %~dp0app
set PYTHON_HOME=C:\Python27\;C:\Python27\Scripts;
set path=%PYTHON_HOME%%path%
call npm i -g @angular/cli yarn cnpm npm
REM call yarn^
REM  && call yarn upgrade -L^
REM  || call cnpm i^
REM  && call cnpm upgrade -S^
REM  || call npm i^
REM  && call npm upgrade -S^
call yarn^
 || call cnpm i^
 || call npm i^
 

start /min run
cd ..
set PYTHON_HOME=%USERPROFILE%\AppData\Local\Programs\Python\Python36\Scripts\;%USERPROFILE%\AppData\Local\Programs\Python\Python36\;
set path=%PYTHON_HOME%%path%
set PY_ENV=dev
chcp 65001
pip install -r api/requirements.txt --upgrade
chcp 936
api/run
cd %startdir%
