FROM node:boron

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app

EXPOSE 3000

RUN ["npm", "build"]
CMD ["npm", "start"]



