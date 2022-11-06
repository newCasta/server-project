import mongoose from 'mongoose'

const { Schema, model } = mongoose

const productSchema = new Schema(
    {
        name: {
            type: String,
        },
        price: {
            type: Number,
        },
        thumbnail: {
            type: String,
        },
        code: {
            type: Number,
        },
        stock: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
)

export default model('Product', productSchema)
