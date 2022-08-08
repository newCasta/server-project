import { Router } from 'express'
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/products.js'
import { isAdmin } from '../middlewares/isAdmin.js'

const router = Router()

router.route('/')
    .get(getProducts)
    .post(isAdmin, createProduct)

router.route('/:pid')
    .get(getProduct)
    .put(isAdmin, updateProduct)
    .delete(isAdmin, deleteProduct)

export default router