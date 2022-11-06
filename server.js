import app from './src/settings.js'
import http from 'http'
import mongoose from 'mongoose'

const port = normalizePort(process.env.PORT || 8080)
const { connect } = mongoose

app.set('port', port)

const server = http.createServer(app)

connect(process.env.MONGO_URI)
    .then(() => {
        server.listen(port)
        server.on('error', onError)
        server.on('listening', onListening)
    })
    .catch(err => {
        console.log(err)
        process.exit(1)
    })

function normalizePort(val) {
    const port = parseInt(val, 10)

    if (isNaN(port)) return val
    if (port >= 0) return port

    return false
}

function onError(error) {
    if (error.syscall !== 'listen') throw error

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`)
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`)
            process.exit(1)
            break
        default:
            throw error
    }
}

function onListening() {
    const addr = server.address()
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
    console.log(`Listening on ${bind}`)
}
