import createError from 'http-errors'
import Product from '../models/Product.js'

export const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find()

        res.json({
            message: 'Products fetched successfully',
            data: products,
        })
    } catch (err) {
        console.log(err)
        next(createError(500))
    }
}

export const getProduct = async (req, res, next) => {
    try {
        const { pid } = req.params
        const product = await Product.findById(pid)

        if (!product) throw createError(404, 'Product not found')

        res.json({
            message: 'Product found',
            data: product,
        })
    } catch (err) {
        next(err)
    }
}

export const createProduct = async (req, res, next) => {
    try {
        const { name, price, thumbnail, code, stock } = req.body

        if (isNaN(price) || isNaN(stock) || isNaN(code))
            throw createError(
                400,
                'Fields: price, stock or code might be numbers'
            )
        if (!name || !price || !thumbnail || !code || !stock)
            throw createError(
                400,
                'Missing required fields name, price, thumbnail, code and stock'
            )

        const product = await Product.create({
            ...req.body,
        })

        res.json({
            message: 'Product created',
            data: product,
        })
    } catch (err) {
        next(err)
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const { pid } = req.params
        const { name, price, thumbnail, code, stock } = req.body
        const product = await Product.findById(pid)

        if (!product) throw createError(404, 'Product not found')
        if (isNaN(price) || isNaN(stock) || isNaN(code))
            throw createError(
                400,
                'Fields: price, stock or code might be numbers'
            )
        if (name || price || thumbnail || code || stock) {
            console.log(req.body)

            await product.update({
                ...req.body,
            })
            const uProduct = await Product.findById(pid)

            return res.json({
                message: 'Product updated',
                data: uProduct,
                status: res.statusCode,
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
        const product = await Product.findById(pid)

        if (!product) throw createError(404, 'Product not found')

        await product.delete()

        res.json({
            message: 'Product deleted',
        })
    } catch (err) {
        next(err)
    }
}
