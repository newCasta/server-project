import passport from 'passport'
import local from 'passport-local'
import User from '../models/User.js'
import { createHash, compareHash } from '../utils/functions.js'

const LocalStrategy = local.Strategy

const initializePassport = () => {
    passport.use(
        'register',
        new LocalStrategy(
            {
                passReqToCallback: true,
                usernameField: 'email',
            },
            async (req, email, password, done) => {
                try {
                    const {
                        name,
                        surname,
                        age,
                        address,
                        phonePrefix,
                        phone,
                        avatar,
                    } = req.body

                    if (
                        !name ||
                        !email ||
                        !surname ||
                        !password ||
                        !age ||
                        !address ||
                        !phonePrefix ||
                        !phone ||
                        !avatar
                    )
                        return done(null, false, {
                            message: 'Incomplete values',
                        })

                    const user = await User.findOne({ email })

                    if (user)
                        return done(null, false, {
                            message: 'User already exists',
                        })

                    const newUser = await User.create({
                        ...req.body,
                        password: await createHash(`${password}`),
                        permissions: ['user'],
                    })

                    return done(
                        null,
                        await User.findById(newUser._id).select('-password')
                    )
                } catch (err) {
                    return done(err)
                }
            }
        )
    )

    passport.use(
        'login',
        new LocalStrategy(
            { usernameField: 'email' },
            async (email, password, done) => {
                try {
                    if (!email || !password)
                        return done(null, false, {
                            message:
                                'Missing required fields email or password',
                        })

                    const user = await User.findOne({ email })

                    if (!user)
                        return done(null, false, {
                            message: 'Incorrect credentials',
                        })
                    if (!(await compareHash(`${password}`, user.password)))
                        return done(null, false, {
                            message: 'Incorrect credentials',
                        })

                    return done(
                        null,
                        await User.findById(user._id).select('-password')
                    )
                } catch (err) {
                    return done(err)
                }
            }
        )
    )

    passport.serializeUser((user, done) => done(null, user._id))

    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id)

        return done(null, user)
    })
}

export default initializePassport
