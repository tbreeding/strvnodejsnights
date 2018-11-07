'use strict'

const { validate, getUpdateSchema } = require('../validations')
const operations = require('../operations/users')
const schemas = require('../validations/schemas/users')
const { getParsedObject } = require('../utils/parseInput')

const signUp = async ctx => {
  const input = {
    name: ctx.request.body.name,
    email: ctx.request.body.email,
    password: ctx.request.body.password,
  }
  validate(schemas.signUp, input)
  const user = await operations.signUp(input)
  ctx.status = 201
  ctx.body = user
}

const signIn = async ctx => {
  const input = {
    email: ctx.request.body.email,
    password: ctx.request.body.password,
  }
  validate(schemas.signIn, input)
  const user = await operations.signIn(input)
  ctx.body = user
}

const signOut = async ctx => {

}

const getAll = async ctx => {
  ctx.body = await operations.getAll()
}

const getById = async ctx => {
  const input = {
    id: parseInt(ctx.params.id),
  }
  validate(schemas.userId, input)
  ctx.body = await operations.getById(input)
}

const update = async (ctx) => {
  const input = {
    id: parseInt(ctx.params.id),
    attributes: getParsedObject(schemas.updateUser, ctx.request.body),
  }
  validate(getUpdateSchema(schemas.updateUser, input.attributes), input.attributes)
  ctx.body = await operations.update(input)
}

const destroy = async (ctx) => {
  const input = {
    id: parseInt(ctx.params.id),
  }
  validate(schemas.userId, input)
  ctx.body = await operations.destroy(input)
}

module.exports = {
  signUp,
  signIn,
  signOut,
  getAll,
  getById,
  update,
  destroy,
}