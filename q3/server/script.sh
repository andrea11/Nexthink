#!/bin/bash
curlAvailable=$(command -v curl >/dev/null 2>&1)
wgetAvailable=$(command -v wget >/dev/null 2>&1)

$curlAvailable || $wgetAvailable || {
  echo >&2 "curl or wget required but not installed.  Aborting."
  exit 1
}

trap '' TSTP
trap terminate TERM INT
terminate() {
  docker-compose down -v
  exit 0
}

docker-compose up --build --detach

sleep 3

if [ -z "$curlAvailable" ]; then
  curl --location --request POST 'http://localhost:8080/v1/query' \
    --header 'Content-Type: application/json' \
    --data-raw '{
    "type": "track_table",
    "args": {
        "schema": "public",
        "name": "author",
        "table": "requests"
    }
}'
elif [ -z "$wgetAvailable" ]; then
  wget --no-check-certificate --quiet \
    --method POST \
    --timeout=0 \
    --header 'Content-Type: application/json' \
    --body-data '{
    "type": "track_table",
    "args": {
        "schema": "public",
        "name": "author",
        "table": "requests"
    }
}' \
    'http://localhost:8080/v1/query'
fi

docker-compose up
