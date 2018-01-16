# CentOS7生产环境部署
0. 安装 windows ssh 客户端:
    [winscp](https://nchc.dl.sourceforge.net/project/winscp/WinSCP/5.11.2/WinSCP-5.11.2-Setup.exe)
    [putty](https://the.earth.li/~sgtatham/putty/0.70/w32/putty-0.70-installer.msi)
1. 安装pyenv(python版本管理):
```shell
yum install yum-utils -y 
yum groupinstall "Development Tools" -y # 开发套件gcc,git...
curl -L https://raw.githubusercontent.com/pyenv/pyenv-installer/master/bin/pyenv-installer | bash
```
`vi ~/.bashrc`添加:
```shell
export PATH="/root/.pyenv/bin:$PATH"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
```
更新pyenv:
```shell
source ~/.bashrc
pyenv update
```
2. 安装 python:
```shell
# 安装 python 依赖
yum install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel -y
# 安装 python
pyenv install --list
pyenv install 3.6.3
pyenv virtualenv 3.6.3 pms # 创建虚拟环境(为项目创建独立的依赖空间)
pyenv activate pms # 切换到新的虚拟环境
pyenv versions
python --version
```
```shell
# 虚拟环境管理
# pyenv deactivate # 切换回系统环境
# rm -rf ~/.pyenv/versions/pms/ # 删除虚拟环境
```
3. 数据库部署:

`vi /etc/yum.repos.d/MariaDB.repo`添加:
```
[mariadb-tuna]
name = MariaDB
baseurl = https://mirrors.tuna.tsinghua.edu.cn/mariadb/yum/10.2/centos7-amd64
gpgkey=https://mirrors.tuna.tsinghua.edu.cn/mariadb/yum/RPM-GPG-KEY-MariaDB
gpgcheck=1
[mariadb-ustc]
name = MariaDB
baseurl = http://mirrors.ustc.edu.cn/mariadb/yum/10.2/centos7-amd64/
gpgkey=http://mirrors.ustc.edu.cn/mariadb/yum/RPM-GPG-KEY-MariaDB
gpgcheck=1
[mariadb.org]
name = MariaDB
baseurl = http://yum.mariadb.org/10.2/centos7-amd64
gpgkey=https://yum.mariadb.org/RPM-GPG-KEY-MariaDB
gpgcheck=1
```
* 安装 MariaDB
```shell
systemctl stop firewalld.service && systemctl disable firewalld.service #关闭防火墙
yum-config-manager --disable mariadb-tuna
sudo yum install MariaDB-server -y
sudo systemctl start mariadb #启动
mysql_secure_installation
mysql -uroot -p
#                 grant 权限 on 数据库名.表名 to 用户@远程主机IP identified by "远程访问密码";
MariaDB [(none)]> GRANT ALL PRIVILEGES ON *.* TO <用户>@'%' IDENTIFIED BY <远程访问密码> WITH GRANT OPTION;
MariaDB [(none)]> flush privileges;
```
* 创建用户,初始化数据库
4. 服务部署:
`vi ~/.bashrc`添加:
```
export PY_DB_NAME=<MariaDB 数据库名称>
export PY_DB_HOST=<MariaDB 服务器地址>
export PY_DB_USERNAME=<MariaDB 用户名>
export PY_DB_PASSWORD=<MariaDB 密码>
export JWT_SECRET_KEY=<密钥字符串>
```
```shell
cd /mnt
git clone https://github.com/DXCChina/pms.git
cd pms/api
pip install -r requirements.txt
chmod u+x app.py
./app.py # 脚本方式启动
pip install gunicorn # 安装 Gunicorn(Python服务器)
gunicorn app:app -w 4 -b 0.0.0.0:8000 # 服务器模式启动
```
5. Nginx 部署:
`vi /etc/yum.repos.d/nginx.repo`添加:
```
[nginx.org]
name=nginx repo
baseurl=http://nginx.org/packages/mainline/centos/7/$basearch/
gpgcheck=0
enabled=1
```
```shell
yum install nginx -y
echo 'daemon off;' >> /etc/nginx/nginx.conf
vi /etc/nginx/conf.d/default.conf #添加upstream,修改root路径(开发环境下执行: yarn build:prod:aot 命令生成的dist目录)
nginx #启动
```
6. 配置 supervisor(进程管理):
```shell
pyenv deactivate # 切换回系统环境
#yum install python-setuptools
easy_install supervisor
echo_supervisord_conf > /etc/supervisord.conf # 生成 supervisor 默认配置文件
vi /etc/supervisord.conf
```
添加如下:
```
[inet_http_server]
port=0.0.0.0:9001

[supervisord]
environment=PY_DB_USERNAME=<数据库用户名>,PY_DB_PASSWORD=<数据库密码>,PY_DB_NAME=<数据库名称>,PY_DB_HOST='localhost'

[program:pms]
command=/root/.pyenv/versions/pms/bin/gunicorn app:app -w 4 -b 0.0.0.0:8000
directory=/root/pms/api
autostart=true
autorestart=true

[program:python]
command=/root/.pyenv/versions/pms/bin/python app.py
directory=/root/pms/api
autostart=false
autorestart=false

[program:nginx]
command=nginx
autostart=true
autorestart=true
```
supervisor的基本命令:
```shell
supervisord #启动 supervisor
ps aux | grep supervisord #查看 supervisord 是否在运行
supervisorctl status #查看 supervisor 状态
supervisorctl update #重载配置文件,更新进程
supervisorctl start [all]|[appname] #启动所有/指定进程
supervisorctl stop [all]|[appname] #关闭所有/指定进程
```
自启动:
```shell
cat /usr/lib/systemd/system/supervisord.service
cp /root/pms/docs/supervisord.service /usr/lib/systemd/system/
systemctl enable supervisord.service
```
7. 测试地址:
    * HOME:[http://122.115.49.94](http://122.115.49.94)
