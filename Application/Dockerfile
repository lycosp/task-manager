FROM ubuntu:21.04
FROM mysql:latest
FROM node:14.6.0-stretch-slim

RUN npm i -g @angular/cli@11.1.4

COPY /Front-End ./Front-End
COPY /Scripts ./Scripts
COPY /Back-End ./Back-End

