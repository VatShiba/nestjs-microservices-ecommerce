# Start Project

In this project, I want to try something new in Backend field. 

- gRPC
- NestJS

Lately I have heard about gRPC performance that really surprised me. The project implements gRPC communication between 5 Microservices and using RESTful at API-Gateway for communicate to the public.

![Alt text](/diagram.png?raw=true "Optional Title")

## Prepare DB

- Serve Postgresql database at port 5432 using Docker or Local Service as these names
  - auth_service
  - order_service
  - product_service
  - user_service
- You can also change database config in each project module

## Prepare Enviroments
- Remove **'.example'** from **'.env.example'** file name in Auth Service
- Download/Install nodejs from [Here](https://nodejs.org/en/download)

## Shell 1
> cd api-gateway-service

> npm install

> yarn start:dev

## Shell 2
> cd auth-service

> npm install

> yarn start:dev

## Shell 3
> cd order-management-service

> npm install

> yarn start:dev

## Shell 4
> cd product-management-service

> npm install

> yarn start:dev

## Shell 5
> cd user-management-service

> npm install

> yarn start:dev
