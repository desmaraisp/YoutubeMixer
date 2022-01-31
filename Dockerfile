# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as build

# Add the source code to app
COPY ./Source/frontend/. /app/
WORKDIR /app

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/build/. /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/

ENV PORT 8080

CMD ["nginx", "-g", "daemon off;", "-c", "/etc/nginx/nginx.conf"]

#FROM python:3
#ENV PYTHONDONTWRITEBYTECODE=1
#ENV PYTHONUNBUFFERED=1

#COPY . .

#RUN python -m pip install -r requirements.txt

#WORKDIR ./Source

#CMD exec python manage.py collectstatic
#CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 1500 YoutubeMixer_project.wsgi