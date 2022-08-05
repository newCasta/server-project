import path from 'path'

Object.defineProperty(global, '__filename', {
    get: () => {
        try {
            throw new Error('Esto es para ver el archivo xddd')
        } catch (err) {
            const errorLines = err.stack.split('\n')
            const pathLine = errorLines.map(line => line.trim()).find(line => line.startsWith('at file:'))
            const filename = path.normalize(pathLine.replace('at file:///', '')).replace(/:\d+:\d+/, '')

            return filename
        }
    }
})

Object.defineProperty(global, '__dirname', {
    get: () => {
        return path.dirname(__filename)
    }
})