import { Router } from 'express'
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/products.js'

const router = Router()

router.route('/')
    .get(getProducts)
    .post(createProduct)

router.route('/:pid')
    .get(getProduct)
    .put(updateProduct)
    .delete(deleteProduct)

export default router