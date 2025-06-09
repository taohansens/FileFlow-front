#!/bin/sh

BACKEND_URL=${BACKEND_URL:-"http://fileflow-svc:8080"}

envsubst '${BACKEND_URL}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

exec "$@" 