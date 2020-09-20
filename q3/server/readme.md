# Introduction
This folder contains the file to startup the backend to which the browser extension will send all captured requests.  
The backend is based on the docker-compose provided by [hasura.io](https://hasura.io/docs/1.0/graphql/core/getting-started/docker-simple.html#step-1-get-the-docker-compose-file)

## Technologies
The technical stack is composed by a Postegres DB and Hasura GraphQL engine

## How to startup
In order to startup the backend, there is a [script.sh](script.sh) provided.
It would be responsible to startup and initialize both pods. 

#### Prerequisites
- Docker
- Docker-compose
- cURL or Wget

## Admin UI
Hasura GraphQL engine provided also an admin UI accessible via the local url: http://localhost:8080/console