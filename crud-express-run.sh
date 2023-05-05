docker run --env-file .env  --network=host -dp 3000:3000 crud-express
#Added --network=host so that docker container can access the host network.