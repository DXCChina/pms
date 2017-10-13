# pms

## 前后端分离架构

### 前端

MVC:angular2

UI:Material,Bootstrap

### 后端

开发语言:Python 
[下载](https://www.python.org/ftp/python/3.6.3/python-3.6.3-amd64.exe) 
[文档](http://www.runoob.com/python3/python3-tutorial.html)

Restful框架:flask 
[文档1](http://flask.pocoo.org/docs/dev/)
[文档2](http://www.pythondoc.com/)

代理服务器:nginx
[下载](http://www.phpstudy.net/phpstudy/phpStudy2017.zip)
[文档](http://www.phpstudy.net/download.html)

Web服务器:Gunicorn

接口测试:Postman
[下载](https://dl.pstmn.io/download/latest/win64)
[文档](http://www.cnblogs.com/s380774061/p/4624326.html)
,开发完成的接口使用Postman进行功能测试

### 数据库

MariaDB 
[下载](https://mirrors.tuna.tsinghua.edu.cn/mariadb//mariadb-10.2.9/winx64-packages/mariadb-10.2.9-winx64.msi) 
[文档](http://www.runoob.com/mysql/mysql-tutorial.html)

### 开发部署

pip install报编码错误:cmd执行```chcp 65001```

#### Windows开发环境搭建
1. 安装依赖:

    ```pip install  -r requirements.txt```
2. 

#### Linux生产环境部署
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
    vi /etc/rc.d/init.d/gunicorn
    ```

    添加如下内容:

    ```
    #!/bin/bash
    # chkconfig: - 85 15
    # description: Gunicorn Server
    pyenv activate pms
    gunicorn app:pms -w 4 -b 0.0.0.0:8000 -p pms.pid -D
    ```

    设置开机启动:

    ```
    sed -i 's/\r//' /etc/rc.d/init.d/gunicorn
    chmod +x /etc/rc.d/init.d/gunicorn
    chkconfig --add gunicorn
    ```

5. Nginx 部署

