import 'dotenv/config'
import './utils/dirname.js'
import express from 'express'
import createError from 'http-errors'
import { join } from 'path'
import logger from 'morgan'

// import routes
import apiRoute from './routes/index.js'

const app = express()

// middelwares
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(join(__dirname, '../public')))

// routes
app.use('/api', apiRoute)

// 404 handler
app.use((req, res, next) => {
    next(createError(500, 'Not found'))
})

// error handler
app.use((err, req, res, next) => {
    const message = err.message
    const error = process.env.NODE_ENV === 'development' ? err : {}

    res.status(err.status || 500).json({
        message: message,
        status: error?.status,
        stack: error?.stack
    })
})

export default app