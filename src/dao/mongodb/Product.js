import mongoose from 'mongoose'
import Container from './container.js'

const { Schema } = mongoose

const productSchema = Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    thumbnail: {
        type: String
    },
    code: {
        type: Number
    },
    stock: {
        type: Number
    }
}, {
    timestamps: true
})

export default class Product extends Container {
    constructor() {
        super('products', productSchema)
    }
}