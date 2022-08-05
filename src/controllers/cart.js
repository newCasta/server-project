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
            data: cart,
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
        const quantity = req.body?.quantity || 1

        const cart = await Cart.getById(cid)

        if (!cart) throw createError(404, 'Cart not found')

        const product = await Product.getById(pid)

        if (!product) throw createError(404, 'Product not found')

        const pCart = cart.products.find(p => p.id === pid)

        if (pCart) {
            if (pCart.quantity >= product.stock) throw createError(400, 'Product out of stock')

            pCart.quantity += 1
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
            data: !pCart ? { id: pid, quantity: 1 } : pCart,
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

        res.json({
            message: 'Cart found',
            data: cart.products,
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
        const completeRemove = req.body?.completeRemove || false
        const cart = await Cart.getById(cid)

        if (!cart) throw createError(404, 'Cart not found')

        const product = await Product.getById(pid)

        if (!product) throw createError(404, 'Product not found')

        const pCart = cart.products.find(p => p.id === pid)

        if (!pCart) throw createError(404, 'Product not found in cart')

        if (completeRemove) {
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
            message: 'Product removed from cart',
            data: { id: pid, quantity: pCart.quantity },
            status: res.statusCode
        })
    } catch (err) {
        next(err)
    }
}