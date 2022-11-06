import createError from 'http-errors'

export const loggedUser = (req, res, next) => {
    if (!req.session.user) return next(createError(401, 'You are not logged'))

    next()
}
