# This file is for creating image which will serve static content to user
FROM node:lts-alpine


WORKDIR /app


RUN npm init -y
RUN npm i http-server



CMD [ "npx", "http-server", "./" , "-p 8099"]


# Docker Command to build image
# docker build -t node-code:latest .


# Docker Command to start container
# docker run -p 5000:5500 -v ${userFiles}:/app -d node-code:latest
# ${userFiles} refers to location where user files are stored on server
#${userFiles} -> /home/ferin/Documents/codedamnProject/server/dist/uploads/ferinpatel@gmail.com