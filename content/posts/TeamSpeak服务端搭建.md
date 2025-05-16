---
title: 'TeamSpeak服务端搭建'
date: '2024-05-20'
description: '服务器'
---
## 前言
买了个轻量应用服务器，想着搞点东西玩玩
## 下载
1. 服务端压缩包
    https://www.teamspeak.com/en/downloads/#server
2. 客户端
   https://www.teamspeak.com/en/downloads/#ts3client
## 安装部署
1. 上传服务端压缩包到Linux服务器，解压
```bash
tar xvf teamspeak3-server_linux_amd64-3.13.7.tar.bz2
```
2. 不建议使用root启动服务，创建一个teamspeak用户
```bash
mv teamspeak3-server_linux_amd64 /home/teamspeak/teamspeak3
useradd teamspeak
passwd teamspeak
chown -R teamspeak:teamspeak /home/teamspeak/teamspeak3/
su teamspeak
```
3. 创建同意许可条款文件
```bash
cd /home/teamspeak/teamspeak3
touch .ts3server_license_accepted
```
4. 启动服务
```bash
./ts3server_startscript.sh start
```
5. 第一次启动后会有秘钥和管理员账号密码，需要将其记下，后面用到
```bash
----------------------------------------------------------------- 
I M P O R T A N T 
------------------------------------------------------------------ 
Server Query Admin Account created 
loginname= "666", password= "666" 
apikey= "666" 
------------------------------------------------------------------ 
------------------------------------------------------------------ 
I M P O R T A N T 
------------------------------------------------------------------ 
ServerAdmin privilege key created, please use it to gain 
serveradmin rights for your virtualserver. please 
also check the doc/privilegekey_guide.txt for details. 
token=666
------------------------------------------------------------------ 
```
7. 服务器需要打开UDP 9987端口
## 客户端连接
1. 打开TS客户端，点击连接菜单，输入服务器IP或者域名，Nickname可以自定义,首次连接不需要输入密码
   ![](https://raw.githubusercontent.com/qingnichimi/pictrue/master/blog/1706855898308.jpg)
2. 连接成功后会要求输入token，即上述启动成功后所显示的
3. 这样就完成TS的服务搭建。其他的具体用法还需要慢慢研究。