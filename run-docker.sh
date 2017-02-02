#!/bin/bash

ENV="PRODUCTION"

if [ ! "$(docker images -q rebecca518/application)" ]; then
  echo "pull image from docker hub"
  docker pull rebecca518/application:latest
else
  if [ "$(docker ps -aq -f name=application_instance)" ]; then
    echo "rm application_instance"
    docker rm application_instance
  fi
fi


echo "run container"
docker run -p 27017:27017 -p 3000:3000 -v $PWD:/app --name application_instance -d rebecca518/application

# run api in container
if [ $ENV == "PRODUCTION" ]; then
  docker exec -it application_instance npm run start
else
  echo "development"
  npm run dev & docker exec -it application_instance npm run server
  kill -9 $(pgrep -f webpack)
fi

# gracefully stop container
docker stop application_instance
