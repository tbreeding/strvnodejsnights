'use strict'

const { validate } = require('../validations')
const operations = require('../operations/users')
const schema = require('../validations/schemas/users')

const signUp = async (ctx) => {
  const input = {
    name: ctx.request.body.name,
    email: ctx.request.body.email,
    password: ctx.request.body.password,
  }
  validate(schema.signUp, input)
  const user = await operations.signUp(input)
  ctx.status = 201
  ctx.body = user
}

const signIn = async (ctx) => {
  const input = {
    email: ctx.request.body.email,
    password: ctx.request.body.password,
  }
  validate(schema.signIn, input)
  const user = await operations.signIn(input)
  ctx.body = user
}

module.exports = {
  signUp,
  signIn
}