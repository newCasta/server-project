import { persistence } from '../config.js'

let services

switch (persistence) {
    case 'MONGO':
        const ProductClass = (await import('./mongodb/Product.js')).default
        const CartClass = (await import('./mongodb/Cart.js')).default
        services = {
            Product: new ProductClass(),
            Cart: new CartClass()
        }
        break

    case 'MEMORY':
        const MemoryClass = (await import('./memory/container.js')).default
        services = {
            Product: new MemoryClass('products'),
            Cart: new MemoryClass('carts')
        }
        break

    case 'FILE':
        const FileClass = (await import('./filesystem/container.js')).default
        services = {
            Product: new FileClass('products'),
            Cart: new FileClass('carts')
        }
        break

    default:
        break
}

export default services