set startdir=%cd%
cd %~dp0
sphinx-apidoc -o docs/ .
cd docs
make html
cd ..
python app.py
cd %startdir%
