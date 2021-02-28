# FROM node:14-stretch-slim

# RUN apt-get update
# RUN apt-get -y install mysql-server
# RUN apt-get -y install curl
# RUN mkdir -p /usr/share/man/man1
# RUN apt-get -y install default-jdk
# RUN groupadd tomcat
# RUN useradd -s /bin/false -g tomcat -d /opt/tomcat tomcat
# RUN curl -O http://www-eu.apache.org/dist/tomcat/tomcat-9/v9.0.11/bin/apache-tomcat-9.0.11.tar.gz
# RUN mkdir /opt/tomcat


# COPY /Front-End/dist/task-manager/task-manager.war ./Front-End/task-manager.war
# COPY /Scripts ./Scripts
# COPY /Back-End .

# RUN npm -y install

FROM tomcat:8.5-jdk15-openjdk-buster

RUN apt-get update

COPY /Scripts ./Scripts
RUN apt-get -y install default-mysql-server

RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get -y install nodejs
# COPY /Front-End/dist/task-manager/task-manager.war ./webapps/task-manager.war
COPY /Scripts ./Scripts
COPY /Back-End .

RUN npm -y install

