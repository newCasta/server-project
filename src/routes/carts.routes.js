import { Router } from 'express'
import { getCart, createCart, deleteCart, addProduct, getProducts, removeProduct } from '../controllers/cart.js'

const router = Router()

router.post('/', createCart)
router.route('/:cid')
    .get(getCart)
    .delete(deleteCart)

router.route('/:cid/products')
    .get(getProducts)
    .post(addProduct)

router.delete('/:cid/products/:pid', removeProduct)

export default router