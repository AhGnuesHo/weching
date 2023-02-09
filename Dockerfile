FROM node:16.17.1-alpine 

 
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
CMD [ "yarn", "dev" ]
EXPOSE 3000
