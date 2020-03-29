# NTHU ArtsCenter Server
[![Build Status](https://travis-ci.com/713-lab/nthu-artscenter-server.svg?branch=master)](https://travis-ci.com/713-lab/nthu-artscenter-server)

## Dependencies
- Typescript
- Node.js 12
- express.js
- sequelize
- postgresql 

## Pre-reqs
To build and run this app locally you will need a few things:
- Install [Node.js](https://nodejs.org/en/)
- Install [PostgreSQL](https://www.postgresql.org/download/)

## Getting Started

- Clone the repository
```
git clone https://github.com/713-lab/nthu-artscenter-server.git
```
- Install dependencies
```
cd <project-name>
npm install
```
- Configure PostgreSQL Server
```bash
sudo psql -c 'create database artscenter;' -U postgres
sudo psql -c "CREATE USER testuser WITH PASSWORD 'testuser';" -U postgres
sudo psql -c "ALTER USER testuser WITH SUPERUSER;" -U postgres
```
- Load the environment variables
```
DB_NAME: testuser
DB_USERNAME: testuser
DB_PASSWORD: testuser
DB_PORT: 5432
SERVER_URL: http://localhost:8090
SERVER_PORT: 8090
```
- Build and Run the server
```
npm run build
npm start
```
- Test the server
```
npm run test
```
- Run test server
```
npm run dev
```

## Docker support

- Run with `docker-compose`
```bash
docker-compose up
```

## Project Structure

> **Note!** Make sure you have already built the app using `npm run build`

| Name | Description |
| -------------------- | ------------------------------------------------------------ |
| **dist**             | Output JS from typescript, mv this code to real server       |
| **node_modules**     | Contains all your npm dependencies                           |
| **src**              | Source code which will be compiled then stored in dist/      |
| **src/config**       | Database setting                                             |
| **src/controllers**  | Functions handles various http requests                      |
| **src/models**       | Models defined by Sequelize                                  |
| **src/public**       | Static assets that will be used client side                  |
| **src**/server.ts    | Entry point to your express app                              |
| **test**             | Test files                                                   |
| .env.example         | API keys, tokens, passwords, database URI.                   |
| .travis.yml          | Used to configure Travis CI build                            |
| jest.config.js       | Used to configure Jest running tests written in TypeScript   |
| package.json         |                                                              | 
| tsconfig.json        | Config settings for compiling server code written in TypeScript |
| tslint.json          |                                    |

# References

- [TypeScript-Node-Starter](https://github.com/microsoft/TypeScript-Node-Starter/blob/master/README.md)
- [Okta: Use TypeScript to Build a Node API with Express](https://developer.okta.com/blog/2018/11/15/node-express-typescript)


