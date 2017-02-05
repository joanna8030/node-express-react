#!/bin/bash

if [ ! "$(docker images -q rebecca518/application)" ]; then
  echo "pull image from docker hub"
  docker pull rebecca518/application:latest
else
  if [ "$(docker ps -aq -f name=application_instance)" ]; then
    docker stop application_instance
    echo "rm application_instance"
    docker rm application_instance
  fi
fi

echo "run container on $NODE_ENV"
docker run -p 27017:27017 -p 3000:3000 -p 8080:8080 -v $PWD:/app -e NODE_ENV=$NODE_ENV --name application_instance -d rebecca518/application
