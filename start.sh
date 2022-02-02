#!/bin/bash
set -e

cd /app
gunicorn --bind :8081 --workers 1 --threads 8 --timeout 90 YoutubeMixer_project.wsgi &
while ! netstat -na | grep 'LISTEN' | grep -q ':8081'; do
  echo "waiting for gunicorn process..."
  sleep 1
done
nginx -c "/etc/nginx/nginx.conf"

wait -n