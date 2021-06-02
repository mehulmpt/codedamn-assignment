FROM node:lts-alpine


WORKDIR /app


RUN npm init -y
RUN npm i http-server



CMD [ "npx", "http-server", "./" , "-p 8099"]
