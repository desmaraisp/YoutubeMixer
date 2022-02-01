FROM node:latest as build

# Add the source code to app
COPY ./Source/frontend/. /app/
WORKDIR /app

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build


#dependencies
FROM python:3.10.2-alpine
RUN apk update && \
    apk add nginx \
	&& apk add bash \
	&& apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

#Python dependencies
COPY /Source/backend/. /app/
COPY requirements.txt .
RUN pip install -r requirements.txt

#Env variables
ARG Environment='Dev'
ARG Youtube_API_Key=''

ENV Youtube_API_Key $Youtube_API_Key
ENV DJANGO_CONFIGURATION $Environment
ENV DJANGO_SETTINGS_MODULE YoutubeMixer_project.settings

#Staticfiles
WORKDIR /app/
CMD exec python manage.py collectstatic

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/build/. /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/

EXPOSE 8080
COPY start.sh /
RUN chmod +x /start.sh
CMD ["/start.sh"]
