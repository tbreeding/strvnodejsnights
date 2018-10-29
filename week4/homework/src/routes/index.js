'use strict'

const Router = require('koa-router')
const { handleErrors, handleNotFound } = require('../middleware/errors')
const { authenticate } = require('../middleware/authentication')
const dogs = require('../controllers/dogs')
const users = require('../controllers/users')

const router = new Router()
router.use(handleErrors)

router.post('/users', users.signUp)
// router.get('/users', authenticate, users.getAll) // TODO
// router.get('/users/:id', authenticate, users.getById) // TODO
// router.post('users/:id', authenticate, users.updateUser) // TODO
// router.delete('users/:id', authenticate, user.deleteUser) // TODO

router.get('/dogs', authenticate, dogs.getAll)
router.get('/dogs/:id', authenticate, dogs.getById)
router.post('/dogs', authenticate, dogs.createDog)
// router.post('/dogs/:id', authenticate, dogs.updateDog) // TODO
// router.delete('/dogs/:id', authenticate, dogs.deleteDog) // TODO

router.use(handleNotFound)

module.exports = router.routes()