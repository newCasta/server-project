import { Router } from 'express'
import {
    login,
    register,
    failure,
    getMe,
    logout,
} from '../controllers/session.js'
import passport from 'passport'
import { loggedUser } from '../middlewares/loggedUser.js'

const router = Router()

router.post(
    '/register',
    passport.authenticate('register', {
        failureRedirect: '/api/session/failure',
    }),
    register
)

router.post(
    '/login',
    passport.authenticate('login', {
        failureRedirect: '/api/session/failure',
    }),
    login
)

router.delete('/logout', loggedUser, logout)

router.get('/me', loggedUser, getMe)

router.get('/failure', failure)

export default router
