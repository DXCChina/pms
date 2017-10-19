set startdir=%cd%
cd %~dp0app
call yarn&&start /min run
cd ..
pip install -r api/requirements.txt --upgrade
pip install sphinx_rtd_theme
api/run
cd %startdir%
