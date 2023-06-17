FROM node:20.1-alpine AS base

EXPOSE 8080
EXPOSE 9150
EXPOSE 4000
EXPOSE 4500
EXPOSE 4400

RUN apk --no-cache add autoconf automake bash g++ libtool make openjdk17-jre python3 && \
    npm install firebase-tools@12.4.0 --global && \
	firebase setup:emulators:firestore && \
	firebase setup:emulators:ui

WORKDIR /home/firebase
COPY . .

ENTRYPOINT [ "firebase", "emulators:start", "--project", "dummy-poject-id" ]