import { Router } from 'express'
import { readdirSync } from 'fs'
import { dirname } from 'dirname-es'

const __dirname = dirname(import.meta)
const router = Router()
const files = readdirSync(__dirname)

files.forEach(async file => {
    if (file.includes('.routes.js')) {
        const name = file.split('.')[0]
        const route = (await import(`./${file}`)).default
        router.use(`/${name}`, route)
    }
})

export default router