'use strict'

const Router = require('koa-router')
const { handleErrors, handleNotFound } = require('../middleware/errors')
const { authenticate } = require('../middleware/authentication')
const dogs = require('../controllers/dogs')
const users = require('../controllers/users')

const router = new Router()
router.use(handleErrors)

router.post('/users', users.signUp)
router.post('/users/signin', users.signIn)
router.post('/users/signOut/:id', authenticate, users.signOut) // TODO
router.get('/users', authenticate, users.getAll)
router.get('/users/:id', authenticate, users.getById)
router.post('/users/:id', authenticate, users.update)
router.delete('/users/:id', authenticate, users.destroy)

router.get('/dogs', authenticate, dogs.getAll)
router.get('/dogs/:id', authenticate, dogs.getById)
router.post('/dogs', authenticate, dogs.create)
router.post('/dogs/:id', authenticate, dogs.update)
router.delete('/dogs/:id', authenticate, dogs.destroy)

router.use(handleNotFound)

module.exports = router.routes()