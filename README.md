# pms 前后端分离架构 v0.1
### 前端(MVC)
* MVC:[angular v4](https://angular.io/) [angular cn](https://angular.cn/)
* UI:[Material](https://material.angular.io/),
   [Bootstrap](https://getbootstrap.com/)
* 前端打包:[Node.js](https://nodejs.org),
    推荐[nvm](https://github.com/coreybutler/nvm-windows/releases/download/1.1.6/nvm-setup.zip),
    [文档](https://github.com/coreybutler/nvm-windows)
* 包管理:推荐[yarn](https://yarnpkg.com/latest.msi),
    [文档](https://yarnpkg.com/docs/cli/)
### 后端(Restful)
* 开发语言:Python v3.6.3
[下载](https://www.python.org/ftp/python/3.6.3/python-3.6.3-amd64.exe) 
[文档](http://www.runoob.com/python3/python3-tutorial.html)
* Restful框架:flask 
[文档1](http://flask.pocoo.org/docs/dev/)
[文档2](http://www.pythondoc.com/)
* 代理服务器:[nginx](https://nginx.org/),推荐phpstudy
[下载](http://www.phpstudy.net/phpstudy/phpStudy2017.zip)
[文档](http://www.phpstudy.net/download.html)
* 接口测试:Postman,开发完成的接口使用Postman进行功能测试
[下载](https://dl.pstmn.io/download/latest/win64)
[文档](http://www.cnblogs.com/s380774061/p/4624326.html)
### 数据库
* MariaDB 
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
1. 数据库配置
    * 创建pms用户
    * 初始化pms数据库
2. 克隆仓库
    ```shell
    git clone https://github.com/DXCChina/pms.git
    cd pms
    ```
3. 启动
    * 一键启动:`run`
    * 启动前端:`app\run`
    * 启动后端:`api\run`
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
            proxy_pass http://localhost:4200;
        }
    }
    ```
5. 测试地址
    * 代理:[http://localhost:81](http://localhost:81),
    [http://localhost:81/api](http://localhost:81/api)
    * APP:[http://localhost:4200](http://localhost:4200)
    * API:[http://localhost:5000/api](http://localhost:5000/api)
6. 问题解决
    * pip install报编码错误:
        * 修改字符编码为utf-8:`chcp 65001`
        * 修改字符编码为gbk:`chcp 936`
    * 安装依赖:
        * 前端:`cd app&&yarn&&cd ..||cd ..`
        * 后端:`pip install -r api/requirements.txt`
#### [CentOS7生产环境部署](https://github.com/canfeit/pms/blob/master/docs/%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83%E9%83%A8%E7%BD%B2.md)
## TODO
2. 接口整理
