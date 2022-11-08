import { Router } from 'express'
import {
    getCart,
    createCart,
    deleteCart,
    addProduct,
    getProducts,
    removeProduct,
    checkout,
} from '../controllers/cart.js'
import { loggedUser } from '../middlewares/loggedUser.js'

const router = Router()

router
    .route('/')
    .get(loggedUser, getCart)
    .delete(loggedUser, deleteCart)
    .post(loggedUser, createCart)

router.post('/checkout', loggedUser, checkout)

router
    .route('/products')
    .get(loggedUser, getProducts)
    .post(loggedUser, addProduct)

router.delete('/products/:pid', loggedUser, removeProduct)

export default router
