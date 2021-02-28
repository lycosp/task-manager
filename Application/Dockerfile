FROM tomcat:8.5.63

RUN apt-get update

# setup node/npm back-end
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get -y install nodejs
COPY /Back-End .
RUN npm -y install

# get front end started
COPY /Front-End/dist/task-manager/task-manager.war ./webapps

# startup back-end when container is created
RUN npm start
