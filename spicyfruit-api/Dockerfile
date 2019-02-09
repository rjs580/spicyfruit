FROM node:latest
RUN mkdir -p /usr/src/spicyfruit_api
WORKDIR /usr/src/spicyfruit_api
COPY package.json /usr/src/spicyfruit_api/
RUN npm install
COPY . /usr/src/spicyfruit_api
EXPOSE 3000
CMD ["npm", "start"]
