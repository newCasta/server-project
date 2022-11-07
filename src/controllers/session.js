import createError from 'http-errors'

export const register = async (req, res, next) => {
    try {
        req.session.user = req.user

        res.json({
            message: 'User registered',
            data: req.user._id,
            status: res.statusCode,
        })
    } catch (err) {
        next(err)
    }
}

export const login = async (req, res, next) => {
    try {
        req.session.user = req.user

        res.json({
            message: 'User logged',
            data: req.session.user,
            status: res.statusCode,
        })
    } catch (err) {
        next(err)
    }
}

export const failure = (req, res, next) => {
    next(createError(500))
}

export const getMe = (req, res, next) => {
    try {
        res.json({
            message: ':)',
            data: req.session.user,
            status: res.statusCode,
        })
    } catch (err) {
        next(err)
    }
}

export const logout = (req, res, next) => {
    try {
        req.session.destroy()

        res.json({
            message: 'successfully logout',
            status: res.statusCode,
        })
    } catch (err) {
        next(err)
    }
}
