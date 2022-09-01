import mongoose from 'mongoose'
import Container from './container.js'

const { Schema } = mongoose

const cartSchema = Schema({
    products: [
        {
            id: {
                type: Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity: Number
        }
    ]
}, {
    timestamps: true
})

export default class Product extends Container {
    constructor() {
        super('carts', cartSchema)
    }
}