set PYTHON_HOME=C:\Python27\;C:\Python27\Scripts;
set path=%PYTHON_HOME%%path%
set startdir=%cd%
cd %~dp0
call yarn start
cd %startdir%