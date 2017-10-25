set startdir=%cd%
cd %~dp0app
set PYTHON_HOME=C:\Python27\;C:\Python27\Scripts;
set path=%PYTHON_HOME%%path%
call yarn
start /min run
cd ..
REM set tmppath=%path%
REM set PYTHON_HOME=C:\Users\wajianhu\AppData\Local\Programs\Python\Python36\Scripts\;C:\Users\wajianhu\AppData\Local\Programs\Python\Python36\;
REM set path=C:\Users\wajianhu\AppData\Local\Programs\Python\Python36;%path%
set PYTHON_HOME=C:\Users\wajianhu\AppData\Local\Programs\Python\Python36\Scripts\;C:\Users\wajianhu\AppData\Local\Programs\Python\Python36\;
set path=%PYTHON_HOME%%path%
pip install -r api/requirements.txt --upgrade
pip install sphinx sphinx_rtd_theme Flask-Sphinx-Themes
REM set path=%tmppath%
api/run
cd %startdir%
