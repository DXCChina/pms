set PYTHON_HOME=C:\Python27\;C:\Python27\Scripts;
set path=%PYTHON_HOME%%path%
set startdir=%cd%
cd %~dp0
start http://localhost:81
call yarn start
cd %startdir%
