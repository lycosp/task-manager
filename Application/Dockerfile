FROM tomcat:latest
COPY /Front-End/dist/task-manager/task-manager.war ./webapps/task-manager.war

RUN apt-get -y update 
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash - 
RUN apt-get install -y nodejs

WORKDIR /Back-End
COPY /Back-End .
RUN npm -y install