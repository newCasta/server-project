import mongoose from 'mongoose'

const { connect, model } = mongoose

export default class MongoContainer {
    constructor(collection, schema) {
        connect(process.env.MONGO_URI)
        this.model = model(collection, schema)
    }

    async getAll() {
        const results = await this.model.find()

        return results
    }

    async getById(id) {
        const item = await this.model.findById(id)

        return item
    }

    async create(item) {
        const newItem = await this.model.create(item)

        return newItem
    }

    async update(id, data) {
        const updatedItem = await this.model.findByIdAndUpdate(id, data)

        return updatedItem
    }

    async remove(id) {
        const removedItem = this.model.findByIdAndDelete(id)

        return removedItem
    }
}