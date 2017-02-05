# node-express-react

This is Step 7 from node-express-react training.  
In this step, separate CRUD into multi page to create single page application

## Prerequisites
- ES6 syntax (Babel as transpiler)
- eslint (Use eslint-config-airbnb)
- node 6.0.0 (must install node.js first)
- Mocha (for testing)
- browserify & webpack (bundle up all dependencies)
- React 15.4.1
- Redux (implement unidirectional data flow)
- docker
- react-router

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
In development stage, change NODE_ENV variable to "development" in package.json:
``` sh
"run-docker": "export NODE_ENV=development && sh run-docker.sh"
```
To get into container, run:
``` sh
docker exec -it container_name /bin/bash
```
To stop this container, run:
``` sh
docker stop application_instance
```
For rebuild Dockerfile, run:
``` sh
docker build -t image_name .
```
