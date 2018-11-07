'use strict'

const log = require('../utils/logger')
const userRepository = require('../repositories/users')
const user_tokens = require('./user_tokens')
const errors = require('../utils/errors')
const crypto = require('../utils/crypto')

const signUp = async (input) => {
  log.info({ input }, 'signUp')
  const user = {
    name: input.name,
    email: input.email.toLowerCase(),
    password: await crypto.hashPassword(input.password),
    disabled: false,
  }
  const alreadyExists = await userRepository.findByEmail(user.email)

  if (alreadyExists) {
    throw new errors.ConflictError('User already exists.')
  }
  const newUser = await userRepository.create(user)
  newUser.accessToken = await user_tokens.create(newUser.id)
  log.info('signUp successful')
  return newUser
}

const signIn = async (input) => {
  log.info({ input: input.email }, 'signIn')
  const user = await userRepository.findByEmail(input.email)

  if (!user) {
    throw new errors.ConflictError('Incorrect Email Address')
  }
  const authenticated = await crypto.comparePasswords(input.password, user.password)

  if(!authenticated) throw new errors.ConflictError('Incorrect Password')
  await user_tokens.deleteAllByUserId(user.id)

  user.accessToken = await user_tokens.create(user.id)

  log.info('signIn successful')
  return user
}

const getAll = async () => await userRepository.findAll()

const getById = async (input) => await userRepository.findById(input.id)

const update = async input => await userRepository.update(input)

const destroy = async input => await userRepository.destroy(input.id)

const verifyTokenPayload = async (input) => {
  log.info({ input }, 'verifyTokenPayload')
  const jwtPayload = await crypto.verifyAccessToken(input.jwtToken)
  const now = Date.now()
  if (!jwtPayload || !jwtPayload.exp || now >= jwtPayload.exp * 1000) {
    throw new errors.UnauthorizedError()
  }

  const userId = parseInt(jwtPayload.userId)
  const user = userRepository.findById(userId)
  if (!user || user.disabled) {
    throw new errors.UnauthorizedError()
  }
  log.info('verifyTokenPayload')
  return {
    user,
    loginTimeout: jwtPayload.exp * 1000,
  }
}

module.exports = {
  signUp,
  signIn,
  verifyTokenPayload,
  getAll,
  getById,
  update,
  destroy
}