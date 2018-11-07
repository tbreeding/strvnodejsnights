'use strict'
const errors = require('../utils/errors')
const User = require('../database/models/user')
const log = require('../utils/logger')

const findAll = async () => await User.query()

const findById = async (id) => {
  const user = await User.query()
    .findById(id)
  if(!user) throw new errors.NotFoundError()

  return user
}

const findByEmail = async (email) => await User.query().findOne({email})

const create = async (attributes) => {
  const user = await User.query()
    .insertAndFetch(attributes)

  log.info('User created:', user.id)

  return user
}

const update = async ({id, attributes}) => {
  const user = await User.query()
    .patchAndFetchById(id, attributes)

  log.info('User updated:', id)

  return user
}

const destroy = async (id) => {
  const user = await User.query()
    .findById(id)
  if(!user) throw new errors.NotFoundError()
  await User.query().deleteById(id)

  log.info('User deleted', user)

  return {
    message: 'User successfully deleted',
    user,
  }
}

const getTokens = async (id) => {
  return await User
    .query()
    .findById(id)
    .$relatedQuery('user_tokens')
    .then(tokens => tokens)
}

module.exports = {
  findAll,
  findById,
  findByEmail,
  create,
  update,
  destroy,
  getTokens,
}