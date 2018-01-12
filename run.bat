set startdir=%cd%
cd %~dp0app
set PYTHON_HOME=C:\Python27\;C:\Python27\Scripts;
set path=%PYTHON_HOME%%path%
call npm i -g yarn
call yarn global add yarn cnpm npm @angular/cli
call yarn&&yarn upgrade -L||call cnpm i&&cnpm upgrade -S||call npm i&&npm upgrade -S
start /min run
cd ..
set PYTHON_HOME=C:\Users\xingd\AppData\Local\Programs\Python\Python36\Scripts\;C:\Users\xingd\AppData\Local\Programs\Python\Python36\;
set path=%PYTHON_HOME%%path%
chcp 65001
pip install -r api/requirements.txt --upgrade
chcp 936
api/run
cd %startdir%
