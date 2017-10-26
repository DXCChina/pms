REM set tmppath=%path%
set PYTHON_HOME=C:\Users\wajianhu\AppData\Local\Programs\Python\Python36\Scripts\;C:\Users\wajianhu\AppData\Local\Programs\Python\Python36\;
set path=%PYTHON_HOME%%path%
REM set path=%path%
set startdir=%cd%
cd %~dp0
REM rd /s/q docs\rst docs\_build
REM sphinx-apidoc -o docs/rst .
cd docs
call make html
cd ..
call python app.py
cd %startdir%
REM set path=%tmppath%
REM set PYTHON_HOME=C:\Python27\;C:\Python27\Scripts;
