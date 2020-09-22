#!/bin/bash
docker build -t web-request-builder .
docker create -ti --name builder web-request-builder bash
rm -rf dist
docker cp builder:/dist ./
docker rm -f builder

cd server
./script.sh
cd ..
