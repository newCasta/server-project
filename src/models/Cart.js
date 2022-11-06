import mongoose from 'mongoose'

const { Schema, model } = mongoose

const cartSchema = new Schema(
    {
        products: [
            {
                _id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                },
                quantity: Number,
            },
        ],
    },
    {
        timestamps: true,
    }
)

export default model('Cart', cartSchema)
