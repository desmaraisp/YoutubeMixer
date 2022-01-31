#!/usr/bin/env bash
set -e

cd /app
gunicorn --bind :8081 --workers 1 --threads 8 --timeout 1500 YoutubeMixer_project.wsgi &
nginx -c "/etc/nginx/nginx.conf" &


sleep 20
wait -n
netstat -plant
