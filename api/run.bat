set startdir=%cd%
cd %~dp0
rd /s/q docs\rst docs\_build
sphinx-apidoc -o docs/rst .
cd docs
call make html
cd ..
call python app.py
cd %startdir%
