FROM node:12.16-alpine3.9

WORKDIR /server/src

COPY ./src /server/src

WORKDIR /server

COPY ./package.json /server
COPY ./tsconfig.json /server
COPY ./tslint.json /server

RUN npm install

RUN npm run build

EXPOSE 8090

CMD ["npm", "start"]