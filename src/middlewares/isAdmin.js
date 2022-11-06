import createError from 'http-errors'

export const isAdmin = (req, res, next) => {
    if (!req.session.user) return next(createError(401, 'You are not logged'))

    const isAdmin = req.session.user.permissions.include('admin')

    if (isAdmin) return next()

    next(createError(403, 'You are not an admin'))
}
