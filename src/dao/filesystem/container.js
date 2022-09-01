import jad from 'jad-db'

export default class FileContainer {
    constructor(table) {
        this.model = jad({ tableName: table })
    }

    async getAll() {
        const results = await this.model.get()

        return results
    }

    async getById(id) {
        const item = await this.model.getById(id)

        return item
    }

    async create(item) {
        const newItem = await this.model.create(item)

        return newItem
    }

    async update(id, data) {
        const updatedItem = await this.model.update(id, data)

        return updatedItem
    }

    async remove(id) {
        const removedItem = this.model.deleteById(id)

        return removedItem
    }
}