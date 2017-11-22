from setuptools import setup

setup(
    name='pms-api',
    packages=['pms-api'],
    include_package_data=True,
    install_requires=[
        'flask',
        'flask-jwt-extended',
        'PyMySQL',
        'peewee',
        'marshmallow',
        'passlib',
        'argon2_cffi',
        'bcrypt',
        'simple-rbac'
    ],
)
