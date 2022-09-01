export default class Container {
    constructor(table) {
        this.data = {}
        this.table = table
    }

    async getAll() {
        return this.data[this.table]
    }

    async getById(id) {
        const item = this.data[this.table].find(item => item.id === id)
        return item
    }

    async create(item) {
        const newItem = { id: this.uuid(), ...item, createdAt: new Date(), updatedAt: new Date() }
        this.data[this.table].push(newItem)
        return newItem
    }

    async update(id, data) {
        const item = await this.getById(id)
        item.updatedAt = new Date()

        Object.assign(item, data)

        return await this.getById(id)
    }

    async remove(id) {
        this.data[this.table] = this.data[this.table].filter(item => item.id !== id)
        return id
    }

    uuid() {
        let now = new Date().getTime()

        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            let random = (now + Math.random() * 16) % 16 | 0
            now = Math.floor(now / 16)

            return (c == 'x' ? random : (random & 0x3 | 0x8)).toString(16)
        })

        return uuid
    }
}