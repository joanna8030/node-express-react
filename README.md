# node-express-react

This is Step 2 from node-express-react training.  
In this step, use React to create a dummy component which showing "Hello World" on page. Use browserify to bundle React application.

## Prerequisites
- ES6 syntax (Babel as transpiler)
- eslint (Use eslint-config-airbnb)
- node 6.0.0 (must install node.js first)
- Mocha (for testing)
- browserify & webpack (bundle up all dependencies)

## Getting Started
Following these steps to run the project on your local machine for development or testing purposes:  

``` sh
git clone https://github.com/joanna8030/node-express-react.git
cd node-express-react
npm install
```
To run the application:
``` sh
npm start
```
Then open your browser on `localhost:3000`

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
