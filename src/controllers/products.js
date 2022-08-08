import Products from '../models/Product.js'
import createError from 'http-errors'

export const getProducts = async (req, res, next) => {
    try {
        const products = await Products.get()

        res.json({
            message: 'Products fetched successfully',
            data: products,
            status: res.statusCode
        })
    } catch (err) {
        next(createError(500))
    }
}

export const getProduct = async (req, res, next) => {
    try {
        const { pid } = req.params
        const product = await Products.getById(pid)

        if (!product) throw createError(404, 'Product not found')

        res.json({
            message: 'Product found',
            data: product,
            status: res.statusCode
        })
    } catch (err) {
        next(err)
    }
}

export const createProduct = async (req, res, next) => {
    try {
        const { name, price, thumbnail, code, stock } = req.body

        if (!name || !price || !thumbnail || !code || !stock)
            throw createError(400, 'Missing required fields name, price, thumbnail, code and stock')

        const pid = await Products.create({
            ...req.body,
            price: parseInt(price),
            stock: parseInt(stock)
        })
        const product = await Products.getById(pid)

        res.json({
            message: 'Product created',
            data: product,
            status: res.statusCode
        })
    } catch (err) {
        next(err)
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const { pid } = req.params
        const { name, price, thumbnail, code, stock } = req.body
        const product = await Products.getById(pid)

        if (!product) throw createError(404, 'Product not found')

        if (name || price || thumbnail || code || stock) {
            await Products.update(pid, {
                ...req.body,
                price: parseInt(price),
                stock: parseInt(stock)
            })
            const product = await Products.getById(pid)

            return res.json({
                message: 'Product updated',
                data: product,
                status: res.statusCode
            })
        }

        throw createError(400, 'There are unknown fields')
    } catch (err) {
        next(err)
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const { pid } = req.params
        const product = await Products.getById(pid)

        if (!product) throw createError(404, 'Product not found')

        await Products.deleteById(pid)

        res.json({
            message: 'Product deleted',
            status: res.statusCode
        })
    } catch (err) {
        next(err)
    }
}