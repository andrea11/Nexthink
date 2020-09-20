#!/bin/bash
docker build -t web-request-builder .
docker create -ti --name builder web-request-builder bash
docker cp builder:/dist ./dist
docker rm -f builder

cd server
./script.sh
cd ..