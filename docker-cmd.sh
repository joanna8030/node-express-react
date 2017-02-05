#!/bin/bash

mongod &

if [ $NODE_ENV == "production" ]; then
  npm run start
else
  npm run dev & npm run server
fi
