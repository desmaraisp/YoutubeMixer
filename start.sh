#!/usr/bin/env bash
set -e

cd /app
nginx -c "/etc/nginx/nginx.conf" &
gunicorn --bind :8081 --workers 1 --threads 8 --timeout 1500 YoutubeMixer_project.wsgi &

wait -n