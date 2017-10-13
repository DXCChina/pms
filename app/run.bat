set startdir=%cd%
cd %~dp0
call yarn start
cd %startdir%