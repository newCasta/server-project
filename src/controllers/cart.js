import createError from 'http-errors'
import Cart from '../models/Cart.js'
import User from '../models/User.js'
import Product from '../models/Product.js'
import { validateObjId } from '../utils/functions.js'
import { transporter } from '../services/emailSender.js'

export const getCart = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.user._id)
        const cart = await Cart.findById(user.cart)

        if (!cart) throw createError(404, 'Cart not found')

        res.json({
            message: 'Cart found',
            data: cart,
        })
    } catch (err) {
        next(err)
    }
}

export const createCart = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.user._id)

        if (!!user.cart)
            return next(createError(400, 'This user already has a cart'))

        const cart = await Cart.create({
            products: [],
        })

        await user.update({ cart: cart._id })

        res.json({
            message: 'Cart created',
            data: cart,
        })
    } catch (err) {
        next(createError(500))
    }
}

export const deleteCart = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.user._id)
        const cart = await Cart.findById(user.cart)

        await user.update({ $unset: { cart: 1 } })

        if (!cart) throw createError(404, 'Cart not found')

        await cart.delete()

        res.json({
            message: 'Cart deleted',
        })
    } catch (err) {
        next(err)
    }
}

export const addProduct = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.user._id)
        const { pid } = req.body

        if (!pid) throw createError(400, 'pid is required')
        if (req.body?.quantity && isNaN(req.body.quantity))
            throw createError(400, 'Quantity must be a number')

        const quantity = parseInt(req.body.quantity) || 1

        const cart = await Cart.findById(user.cart)

        if (!cart) throw createError(404, 'Cart not found')

        const product = await Product.findById(pid)

        if (!product) throw createError(404, 'Product not found')

        const pCart = cart.products.find(p => validateObjId(p._id, product._id))

        if (pCart) {
            if (quantity + pCart.quantity > product.stock)
                throw createError(400, 'Product out of stock')

            if (pCart.quantity >= product.stock)
                throw createError(400, 'Product out of stock')

            pCart.quantity += quantity
            cart.products = cart.products.map(p =>
                validateObjId(p._id, product._id) ? pCart : p
            )
        } else {
            if (product.stock <= 0)
                throw createError(400, 'Product out of stock')
            if (quantity > product.stock)
                throw createError(400, 'Product out of stock')

            cart.products.push({
                _id: product._id,
                quantity,
            })
        }

        await Cart.findByIdAndUpdate(user.cart, cart)

        res.json({
            message: 'Product added to cart',
            data: pCart ?? { _id: product._id, quantity },
        })
    } catch (err) {
        next(err)
    }
}

export const getProducts = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.user._id)
        const cart = await Cart.findById(user.cart)

        if (!cart) throw createError(404, 'Cart not found')

        const products = await Promise.all(
            cart.products.map(async p => {
                const product = await Product.findById(p.id)

                return {
                    product,
                    quantity: p.quantity,
                }
            })
        )

        res.json({
            message: 'Products fetched',
            data: products,
        })
    } catch (err) {
        next(err)
    }
}

export const removeProduct = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.user._id)
        const { pid } = req.params
        const removeAll =
            !req.body.removeAll || !!req.body.quantityToRemove ? false : true
        const quantityToRemove = req.body.quantityToRemove ?? 1
        const cart = await Cart.findById(user.cart)

        if (!cart) throw createError(404, 'Cart not found')

        const product = await Product.findById(pid)

        if (!product) throw createError(404, 'Product not found')

        const pCart = cart.products.find(p => validateObjId(p._id, product._id))

        if (!pCart) throw createError(404, 'Product not found in cart')

        if (removeAll) {
            cart.products = cart.products.filter(p =>
                validateObjId(p._id, product._id, false)
            )

            await Cart.findByIdAndUpdate(user.cart, cart)

            return res.json({
                message: 'Product completely removed from cart',
                status: res.statusCode,
            })
        }

        if (pCart.quantity === 1) {
            cart.products = cart.products.filter(p =>
                validateObjId(p._id, product._id, false)
            )
        } else {
            pCart.quantity -= quantityToRemove
            cart.products = cart.products.map(p =>
                validateObjId(p._id, product._id) ? pCart : p
            )
        }

        await Cart.findByIdAndUpdate(user.cart, cart)

        res.json({
            message: 'Remove one product from cart',
            data: { id: pid, quantity: pCart.quantity },
        })
    } catch (err) {
        next(err)
    }
}

export const checkout = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.user._id)
        const cart = await Cart.findById(user.cart)

        if (!cart) throw createError(404, 'Cart not found')
        if (cart.products.length < 1)
            throw createError(404, 'There are no products')

        for (const p of cart.products) {
            const product = await Product.findById(p._id)

            if (!product) throw createError(404, 'Product not found')

            await product.updateOne({
                stock: parseInt(product.stock) - parseInt(p.quantity),
            })
        }

        await cart.updateOne({ products: [] })
        await transporter.sendMail({
            from: 'ecommerce-app',
            to: JSON.stringify(user.email),
            subject: 'Payment success',
            html: `
            <h1>Payment successfully</h1> 
            `,
        })

        res.json({
            message: 'payment success',
        })
    } catch (err) {
        next(err)
    }
}
