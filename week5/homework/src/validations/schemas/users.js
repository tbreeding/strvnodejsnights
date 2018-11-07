'use strict'

const jwtToken = {
  type: 'Object',
  required: true,
  properties: {
    jwtToken: { type: 'string', required: true },
  },
}

const login = {
  type: 'Object',
  required: true,
  properties: {
    email: { type: 'string', required: true, format: 'email', maxLength: 80 },
    password: { type: 'string', required: true, minLength: 8, maxLength: 80 },
  },
}

const signUp = {
  type: 'Object',
  required: true,
  properties: {
    name: { type: 'string', required: true, pattern: '^[A-Za-z. -]+$', maxLength: 80 },
    email: { type: 'string', required: true, format: 'email', maxLength: 80 },
    password: { type: 'string', required: true, minLength: 8, maxLength: 80 },
  },
}

const signIn = {
  type: 'Object',
  required: true,
  properties: {
    email: { type: 'string', required: true, format: 'email', maxLength: 80 },
    password: { type: 'string', required: true, minLength: 8, maxLength: 80 },
  },
}

const userId = {
  type: 'Object',
  required: true,
  properties: {
    id: { type: 'integer', required: true, min: 1, max: 99999999 },
  },
}

const updateUser = {
  type: 'Object',
  required: true,
  properties: {
    name: { type: 'string', pattern: '^[A-Za-z. -]+$', maxLength: 80 },
    password: { type: 'string', minLength: 8, maxLength: 80 },
  },
}

module.exports = {
  jwtToken,
  login,
  signUp,
  signIn,
  userId,
  updateUser,
}