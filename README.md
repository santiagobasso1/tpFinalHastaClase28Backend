# 👋 Segunda practica integradora
_Segunda practica integradora del curso de backend_

## Pre Requirements 📋

_Para utilizar la aplicación necesita instalar las dependencias con el siguiente comando:_
```
npm i
```
## Rutas de la API a testear

### Products: 
```
http://localhost:5000/api/products [GET]
http://localhost:5000/api/products/:pid [GET]
http://localhost:5000/api/products [POST]
http://localhost:5000/api/products/:pid [PUT]
http://localhost:5000/api/products/:pid [DELETE]
```
### Cart:
```
http://localhost:5000/api/carts [GET]
http://localhost:5000/api/carts/:cid [PUT]
http://localhost:5000/api/carts/:cid/products/:pid [PUT]
http://localhost:5000/api/carts/:cid [GET]
http://localhost:5000/api/carts/:cid/products/:pid [POST]
http://localhost:5000/api/carts/:cid/products/:pid [DELETE]
http://localhost:5000/api/carts/:cid [DELETE]
```
### Chat:
```
http://localhost:5000/chat [GET] 
```
### Github Auth (Por esta entrega deshabilitado):
```
http://localhost:5000/authSession/github [GET]
http://localhost:5000/authSession/githubSession [GET]
```
### Sessions:
```
http://localhost:5000/api/session/current [GET]
http://localhost:5000/api/session/login [GET]
http://localhost:5000/api/session/testLogin [POST]
http://localhost:5000/api/session/logout [GET]
```
### User:
```
http://localhost:5000/user/register [POST]
http://localhost:5000/user/register [GET]
http://localhost:5000/user/email/:email [GET] 
```
