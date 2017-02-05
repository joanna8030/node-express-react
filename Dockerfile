FROM ubuntu:latest

# Install Node.js v 6.0.0
RUN apt-get -y update && \
    apt-get -y install sysvinit-utils && \
    apt-get -y install sudo && \
    apt-get -y install vim && \
    apt-get -y install wget && \
    apt-get -y install npm && \
    npm install -g n && \
    npm install -g nodemon &&\
    n 6.0.0 && \
    mkdir -p /vol/node/start

# install mongodb
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
RUN echo "deb http://repo.mongodb.org/apt/debian jessie/mongodb-org/3.4 main" | tee /etc/apt/sources.list.d/mongodb-org-3.4.list
RUN apt-get update && apt-get install -y mongodb-org
RUN mkdir -p /data/db
COPY /mongodb /data/db
EXPOSE 27017

# ENTRYPOINT exec mongod

# run app
RUN mkdir /app
WORKDIR /app

ADD package.json /app
# RUN npm install
COPY . /app
EXPOSE 3000

CMD ["bash", "./docker-cmd.sh"]
