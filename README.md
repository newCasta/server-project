# server project

the server for my final project
i didn't have time for the views but here is the full api

the mongo url: mongodb+srv://siCasta:KAAbg22xkalVCHg6@cluster0.7sqyldr.mongodb.net/?retryWrites=true&w=majority

## routes

- `POST` /api/carts : create a new cart
- `GET` /api/carts : get a cart
- `DELETE` /api/carts : delete a cart
- `POST` /api/carts/products : add a product to a cart
- `GET` /api/carts/products : get all products in a cart
- `DELETE` /api/carts/products/:pid : delete a product from a cart
- `POST` /api/carts/checkout : simulate a payment and reduce the product stock

- `POST` /api/products : create a new product needs admin
- `GET` /api/products : get all products
- `GET` /api/products/:pid : get a product
- `DELETE` /api/products/:pid : delete a product needs admin
- `PUT` /api/products/:pid : update a product needs admin

- `POST` /api/session/register : register a new user
- `POST` /api/session/login : a user can logs in
- `DELETE` /api/session/logout : eliminates a user session
- `GET` /api/session/me : gets the current user in session
- `GET` /api/session/failure : just an error

## environment variables

- `PORT`: the port of the server
- `NODE_ENV`: the environment of the server
- `MONGO_URI`: the uri of the mongo db
- `SESSION_SECRET`: the secret of express session

## installation

```bash
$ npm install
```

## usage

```bash
$ npm start
```
