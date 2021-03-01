FROM node:14.6.0-stretch-slim
RUN apt-get update
COPY . ./Back-End
WORKDIR /Back-End
RUN npm -y install
CMD ["npm", "start"]