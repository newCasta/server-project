import createError from 'http-errors'

export const isAdmin = (req, res, next) => {
    const isAdmin = req.headers?.isadmin

    if (!!isAdmin) return next()

    next(createError(403, 'You are not an admin'))
}