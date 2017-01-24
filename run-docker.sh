# pull image from docker hub
docker pull rebecca518/application:latest

# run container
docker run -p 27017:27017 -p 3000:3000 -v $PWD:/app --name application_instance -d rebecca518/application

# run api in container
docker exec -it application_instance npm run start

# gracefully stop container
docker stop application_instance
