import Cart from '../models/Cart.js'
import Product from '../models/Product.js'
import createError from 'http-errors'

export const getCart = async (req, res, next) => {
    try {
        const { cid } = req.params
        const cart = await Cart.getById(cid)

        if (!cart) throw createError(404, 'Cart not found')

        res.json({
            message: 'Cart found',
            data: cart,
            status: res.statusCode
        })
    } catch (err) {
        next(err)
    }
}

export const createCart = async (req, res, next) => {
    try {
        const cart = await Cart.create({
            products: []
        })

        res.json({
            message: 'Cart created',
            data: cart,
            status: res.statusCode
        })
    } catch (err) {
        next(createError(500))
    }
}

export const deleteCart = async (req, res, next) => {
    try {
        const { cid } = req.params
        const cart = await Cart.getById(cid)

        if (!cart) throw createError(404, 'Cart not found')

        await Cart.deleteById(cid)

        res.json({
            message: 'Cart deleted',
            status: res.statusCode
        })
    } catch (err) {
        next(err)
    }
}

export const addProduct = async (req, res, next) => {
    try {
        const { cid } = req.params
        const { pid } = req.body

        if (req.body?.quantity && isNaN(req.body.quantity)) throw createError(400, 'Quantity must be a number')

        const quantity = parseInt(req.body.quantity) || 1

        const cart = await Cart.getById(cid)

        if (!cart) throw createError(404, 'Cart not found')

        const product = await Product.getById(pid)

        if (!product) throw createError(404, 'Product not found')

        const pCart = cart.products.find(p => p.id === pid)

        if (pCart) {
            if (pCart.quantity >= product.stock) throw createError(400, 'Product out of stock')

            pCart.quantity += quantity
            cart.products = cart.products.map(p => p.id === pid ? pCart : p)
        } else {
            if (product.stock <= 0) throw createError(400, 'Product out of stock')
            if (quantity > product.stock) throw createError(400, 'Product out of stock')

            cart.products.push({
                id: pid,
                quantity
            })
        }
        await Cart.update(cid, cart)

        res.json({
            message: 'Product added to cart',
            data: !pCart ? { id: pid, quantity } : pCart,
            status: res.statusCode
        })
    } catch (err) {
        next(err)
    }
}

export const getProducts = async (req, res, next) => {
    try {
        const { cid } = req.params
        const cart = await Cart.getById(cid)

        if (!cart) throw createError(404, 'Cart not found')

        const products = await Promise.all(cart.products.map(async p => {
            const product = await Product.getById(p.id)
            return {
                product,
                quantity: p.quantity
            }
        }))


        console.log(products)

        res.json({
            message: 'Cart found',
            data: products,
            status: res.statusCode
        })
    } catch (err) {
        next(err)
    }
}

export const removeProduct = async (req, res, next) => {
    try {
        const { cid } = req.params
        const { pid } = req.params
        const removeAll = req.query.removeAll || false
        const cart = await Cart.getById(cid)

        if (!cart) throw createError(404, 'Cart not found')

        const product = await Product.getById(pid)

        if (!product) throw createError(404, 'Product not found')

        const pCart = cart.products.find(p => p.id === pid)

        if (!pCart) throw createError(404, 'Product not found in cart')

        if (removeAll) {
            cart.products = cart.products.filter(p => p.id !== pid)

            await Cart.update(cid, cart)

            return res.json({
                message: 'Product completely removed from cart',
                status: res.statusCode
            })
        }

        if (pCart.quantity === 1) {
            cart.products = cart.products.filter(p => p.id !== pid)
        } else {
            pCart.quantity -= 1
            cart.products = cart.products.map(p => p.id === pid ? pCart : p)
        }

        await Cart.update(cid, cart)

        res.json({
            message: 'Remove one product from cart',
            data: { id: pid, quantity: pCart.quantity },
            status: res.statusCode
        })
    } catch (err) {
        next(err)
    }
}