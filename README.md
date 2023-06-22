# Start Project

## Prepare DB

- Serve Postgresql database using Docker or Local Service as these names
  - auth_service
  - order_service
  - product_service
  - user_service
- You can also change database config in each project module

## Prepare Enviroments
- Remove **'.example'** from **'.env'** file name in Auth Service
- Download/Install nodejs from [Here](https://nodejs.org/en/download)

## Shell 1
```cd api-gateway-service```
```npm install```
```yarn start:dev```

## Shell 2
```cd auth-service```
```npm install```
```yarn start:dev```

## Shell 3
```cd order-management-service```
```npm install```
```yarn start:dev```

## Shell 4
```cd product-management-service```
```npm install```
```yarn start:dev```

## Shell 5
```cd user-management-service```
```npm install```
```yarn start:dev```
