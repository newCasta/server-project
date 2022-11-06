import mongoose from 'mongoose'

const { Schema, model } = mongoose

const userSchema = new Schema(
    {
        name: {
            type: String,
        },
        surname: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        address: {
            type: String,
        },
        age: {
            type: Number,
        },
        phonePrefix: {
            type: Number,
        },
        phone: {
            type: Number,
        },
        avatar: {
            type: String,
        },
        permissions: [String],
        cart: {
            type: Schema.Types.ObjectId,
            ref: 'Cart',
        },
    },
    {
        timestamps: true,
    }
)

export default model('User', userSchema)
