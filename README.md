# 项目管理平台 v0.3
### 新一代、轻量级项目生命周期质量管理平台
![业务流程](https://github.com/DXCChina/pms/raw/master/docs/%E4%B8%9A%E5%8A%A1%E6%B5%81%E7%A8%8B.png)
   1. 项目管理:
      项目创建,进度控制,信息更新,成员及角色管理.
   2. 角色管理:
      三种角色:项目经理,开发人员,测试人员,分别对接不同的业务.
   3. 需求管理:
      项目经理有权创建项目需求,需求体现了项目要实现基本功能点.
   4. 活动管理:
      项目经理有权创建项目活动并分配活动给项目成员,活动由若干需求组成,活动是项目进度管理的基本单位.
   5. 测试管理:
      测试人员提交测试用例,测试并生成测试报告,开发人员对测试结果中待修复活动进行修复.
## [在线体验](http://122.115.49.94) 账号：demo 密码：demodemo
## [问题反馈](https://github.com/DXCChina/pms/issues/new)
## [欢迎 Pull request](https://github.com/DXCChina/pms/pulls)
## 架构
![架构设计](https://github.com/DXCChina/pms/raw/master/docs/%E7%B3%BB%E7%BB%9F%E6%9E%B6%E6%9E%84.png)
### 前端(MVC)
* MVC:[angular v5](https://angular.io/) [angular cn](https://angular.cn/)
* UI:[Material](https://material.angular.io/),
   [Bootstrap](https://getbootstrap.com/)
* 前端编译:[Node.js](https://nodejs.org),
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
### [API Requirements](https://github.com/DXCChina/pms/blob/master/api/requirements.txt)
### 开发部署
#### Windows开发环境搭建
1. 开发环境依赖 [git](https://git-scm.com/download/win),
    [Python](https://www.python.org/ftp/python/3.6.3/python-3.6.3-amd64.exe),
    [nvm](https://github.com/coreybutler/nvm-windows/releases/download/1.1.6/nvm-setup.zip)&
    [yarn](https://yarnpkg.com/latest.msi),
    [Nginx](http://www.phpstudy.net/phpstudy/phpStudy2017.zip),
    [MariaDB](https://mirrors.tuna.tsinghua.edu.cn/mariadb//mariadb-10.2.9/winx64-packages/mariadb-10.2.9-winx64.msi),
    [Postman](https://dl.pstmn.io/download/latest/win64)
2. 克隆仓库
    ```shell
    git clone https://github.com/DXCChina/pms.git
    cd pms
    ```
3. 启动
    * 添加环境变量:
    ```
    PY_ENV:dev
    PY_DB_NAME:<数据库名称>
    PY_DB_HOST:<数据库地址>
    PY_DB_USERNAME:<数据库用户名>
    PY_DB_PASSWORD:<数据库用户密码>
    JWT_SECRET_KEY:<项目加密密钥字符串>
    ```
    * 一键启动:`run`
    * 启动前端:`app\run`
    * 启动后端:`api\run`
4. nginx配置示例
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
    * HOME:[http://localhost:81](http://localhost:81)
6. 问题解决
    * pip install报编码错误:
        * 修改字符编码为utf-8:`chcp 65001`
        * 修改字符编码为gbk:`chcp 936`
    * 安装依赖:
        * 前端:`cd app&&yarn`
        * 后端:`pip install -r api/requirements.txt`
#### 前端打包发布
```bash
cd app
yarn build:aot # 生成的 dist 目录上传到生产环境 nginx 静态资源路径
```
#### [CentOS7生产环境部署](https://github.com/canfeit/pms/blob/master/docs/%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83%E9%83%A8%E7%BD%B2.md)
### 测试
* [python 单元测试](https://hypothesis.readthedocs.io/en/master/quickstart.html)
* [flask 接口测试](http://flask.pocoo.org/docs/dev/testing/)
* [angular 单元测试](https://angular.cn/guide/testing)
* [angular E2E测试](http://www.protractortest.org/#/tutorial)
