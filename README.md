# server project

the server for my final project

the mongo url: mongodb+srv://siCasta:KAAbg22xkalVCHg6@cluster0.7sqyldr.mongodb.net/?retryWrites=true&w=majority

## routes

- `POST` /api/carts : create a new cart
- `GET` /api/carts/:cid : get a cart
- `DELETE` /api/carts/:cid : delete a cart
- `POST` /api/carts/:cid/products : add a product to a cart
- `GET` /api/carts/:cid/products : get all products in a cart
- `DELETE` /api/carts/:cid/products/:pid : delete a product from a cart

- `POST` /api/products : create a new product needs admin
- `GET` /api/products : get all products
- `GET` /api/products/:pid : get a product
- `DELETE` /api/products/:pid : delete a product needs admin
- `PUT` /api/products/:pid : update a product needs admin

## environment variables

- `PORT`: the port of the server
- `NODE_ENV`: the environment of the server
- `MONGO_URI`: the uri of the mongo db

## headers for admin mode

- `isAdmin`: a boolean value indicating whether the user is an admin

## installation

```bash
$ npm install
```

## usage

```bash
$ npm start
```
