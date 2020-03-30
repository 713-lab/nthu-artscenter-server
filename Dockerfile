FROM node:12.16-alpine3.9


WORKDIR /server

COPY ./package.json /server
COPY ./tsconfig.json /server
COPY ./tslint.json /server

RUN npm install

COPY ./src /server/src
COPY ./test /server/test
COPY ./script /server/script

RUN npm run build

EXPOSE 8090

CMD ["npm", "start"]