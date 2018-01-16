set PY_ENV=dev
set PYTHON_HOME=%USERPROFILE%\AppData\Local\Programs\Python\Python36\Scripts\;%USERPROFILE%\AppData\Local\Programs\Python\Python36\;
set path=%PYTHON_HOME%%path%
set startdir=%cd%
cd %~dp0
call python app.py
cd %startdir%
