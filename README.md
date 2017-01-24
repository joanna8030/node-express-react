# node-express-react

This is Step 6 from node-express-react training.  
In this step, put data in mongodb, and use redux-thunk to handle async actions.
For testing available and easily share developing environment, deploy this application on docker

## Prerequisites
- ES6 syntax (Babel as transpiler)
- eslint (Use eslint-config-airbnb)
- node 6.0.0 (must install node.js first)
- Mocha (for testing)
- browserify & webpack (bundle up all dependencies)
- React 15.4.1
- Redux (implement unidirectional data flow)
- docker

## Getting Started
Following these steps to run the project on your local machine for development or testing purposes:  

``` sh
git clone https://github.com/joanna8030/node-express-react.git
cd node-express-react
npm install
```
To run the application (install docker first):
``` sh
npm run run-docker
```
This command will run a shell script(run-docker.sh) to pull image from docker hub, and start running a container named application_instance. (Check out Dockerfile to see container environment)    

Then open your browser on `localhost:3000`

To remove this docker container, run
``` sh
docker rm application_instance
docker ps -a
```  
will got docker containers all clean!

## Running the test
This application use mocha as test framework.  
Input command in terminal:
``` sh
npm run test
```

## Development stage
In development stage, use webpack bundler to implement hot-reload:
``` sh
npm run dev
```
In the same time, start server:
``` sh
npm run server
```    
For rebuild Dockerfile, run:
``` sh
docker build -t image_name .
```
To get into container, run:
``` sh
docker exec -it container_name /bin/bash
```
