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
// router.get('/users', authenticate, users.getAll) // TODO
// router.get('/users/:id', authenticate, users.getById) // TODO
// router.post('users/:id', authenticate, users.updateUser) // TODO
// router.delete('users/:id', authenticate, user.deleteUser) // TODO

router.get('/dogs', dogs.getAll)
router.get('/dogs/:id', dogs.getById)
router.post('/dogs', dogs.create)
router.post('/dogs/:id', dogs.update)
// router.delete('/dogs/:id', authenticate, dogs.deleteDog) // TODO

router.use(handleNotFound)

module.exports = router.routes()