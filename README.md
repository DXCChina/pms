# pms v0.1

## 前后端分离架构

### 前端

MVC:[angular v4](https://angular.io/) [angular cn](https://angular.cn/)

UI:[Material](https://material.angular.io/),
   [Bootstrap](https://getbootstrap.com/)

前端打包:[Node.js](https://nodejs.org),
    推荐[nvm](https://github.com/coreybutler/nvm-windows/releases/download/1.1.6/nvm-setup.zip),
    [文档](https://github.com/coreybutler/nvm-windows)

包管理:推荐[yarn](https://yarnpkg.com/latest.msi),
    [文档](https://yarnpkg.com/docs/cli/)

### 后端

开发语言:Python v3.6.3
[下载](https://www.python.org/ftp/python/3.6.3/python-3.6.3-amd64.exe) 
[文档](http://www.runoob.com/python3/python3-tutorial.html)

Restful框架:flask 
[文档1](http://flask.pocoo.org/docs/dev/)
[文档2](http://www.pythondoc.com/)

代理服务器:[nginx](https://nginx.org/),推荐phpstudy
[下载](http://www.phpstudy.net/phpstudy/phpStudy2017.zip)
[文档](http://www.phpstudy.net/download.html)

接口测试:Postman,开发完成的接口使用Postman进行功能测试
[下载](https://dl.pstmn.io/download/latest/win64)
[文档](http://www.cnblogs.com/s380774061/p/4624326.html)

### 数据库

MariaDB 
[下载](https://mirrors.tuna.tsinghua.edu.cn/mariadb//mariadb-10.2.9/winx64-packages/mariadb-10.2.9-winx64.msi) 
[文档](http://www.runoob.com/mysql/mysql-tutorial.html)
[驱动](https://pymysql.readthedocs.io/en/latest/modules/index.html)

### 开发部署

#### Windows开发环境搭建
0. 安装 [git](https://git-scm.com/download/win),
    [Python](https://www.python.org/ftp/python/3.6.3/python-3.6.3-amd64.exe),
    [nvm](https://github.com/coreybutler/nvm-windows/releases/download/1.1.6/nvm-setup.zip)&
    [yarn](https://yarnpkg.com/latest.msi),
    [Nginx](http://www.phpstudy.net/phpstudy/phpStudy2017.zip),
    [MariaDB](https://mirrors.tuna.tsinghua.edu.cn/mariadb//mariadb-10.2.9/winx64-packages/mariadb-10.2.9-winx64.msi),
    [Postman](https://dl.pstmn.io/download/latest/win64)
1. 克隆仓库:

    ```
    git clone https://github.com/DXCChina/pms.git
    cd pms
    ```
3. 启动:```run```
    * 前端:```app\run```
    * 后端:```api\run```
4. nginx配置
    ```
    #负载均衡服务器列表
    upstream backend {
        #权值越高被分配到的机率越大
        server 127.0.0.1:5000  weight=1;
    }
    server {
        listen       81;
        server_name  localhost;
        proxy_connect_timeout 10;
        proxy_read_timeout 150;
        proxy_send_timeout 15;
        location /api {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
        location / {
            root   /mnt/pms/app;
            index  index.html editor.html;
        }
    ...
    ```
5. 异常解决
    * pip install报编码错误:```chcp 65001```
    * 安装依赖:
        * 前端:```cd app&&yarn&&cd ..||cd ..```
        * 后端:```pip install -r api/requirements.txt```

#### Linux生产环境部署

0. easy_install supervisor
1. 安装pyenv

    ```curl -L https://raw.githubusercontent.com/pyenv/pyenv-installer/master/bin/pyenv-installer | bash```

    更新:
    
    ```pyenv update```
    
    ```vi ~/.bashrc``` 添加:

    ```
    export PATH="/root/.pyenv/bin:$PATH"
    eval "$(pyenv init -)"
    eval "$(pyenv virtualenv-init -)"
    ```

2. 安装python

    ```bash
    yum groupinstall "Development Tools" -y
    yum install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel -y
    pyenv install --list
    pyenv install 3.6.3
    pyenv virtualenv 3.6.3 pms # 创建虚拟环境(为项目创建独立的依赖空间)
    pyenv activate pms # 切换到新的虚拟环境
    pyenv versions
    python --version
    ```

    ```
    pyenv deactivate # 切换回系统环境
    rm -rf ~/.pyenv/versions/pms/ # 删除虚拟环境
    ```

3. 部署项目
    ```bash
    pip install flask
    git clone https://github.com/DXCChina/pms.git
    cd pms/api
    chmod u+x app.py
    ./app.py # 脚本方式启动
    ```

4. Gunicorn 部署
    ```bash
    pip install gunicorn
    vi /etc/init/gunicorn.conf
    ```
    ```
    description "The myflask service"
    start on runlevel [2345]
    stop on runlevel [!2345]
    respawn
    setuid root
    setgid www-data
    env PATH=/root/.pyenv/versions/pms/bin
    chdir /root/pms/api
    exec gunicorn app:app -w 4 -b 0.0.0.0:8000
    ```

5. echo_supervisord_conf > /etc/supervisord.conf

    [inet_http_server]         
    port=127.0.0.1:9001
    username=user
    password=123
    [supervisorctl]
    serverurl=unix:///tmp/supervisor.sock
    serverurl=http://127.0.0.1:9001
    username=chris
    password=123
    [program:gunicorn]
    command=/root/.pyenv/versions/pms/bin/gunicorn app:app -w 4 -b 0.0.0.0:8000
    directory=/root/pms/api
    autostart=true
    autorestart=true
    startsecs=3

5. Nginx 部署

