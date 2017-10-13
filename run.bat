set startdir=%cd%
cd %~dp0app
call yarn&&start /min run
cd ..
api/run
cd %startdir%
