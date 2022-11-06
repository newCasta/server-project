import { Router } from 'express'
import {
    getCart,
    createCart,
    deleteCart,
    addProduct,
    getProducts,
    removeProduct,
} from '../controllers/cart.js'
import { loggedUser } from '../middlewares/loggedUser.js'

const router = Router()

router.post('/', loggedUser, createCart)
router.route('/:cid').get(loggedUser, getCart).delete(loggedUser, deleteCart)

router
    .route('/:cid/products')
    .get(loggedUser, getProducts)
    .post(loggedUser, addProduct)

router.delete('/:cid/products/:pid', loggedUser, removeProduct)

export default router
