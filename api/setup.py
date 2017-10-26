from setuptools import setup

setup(
    name='pms-api',
    packages=['pms-api'],
    include_package_data=True,
    install_requires=[
        'flask',
        'PyMySQL',
        'passlib',
        'marshmallow',
        'flask-jwt-extended',
    ],
)
