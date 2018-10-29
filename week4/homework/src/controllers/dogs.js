'use strict'

const { validate } = require('./../validations')
const operations = require('./../operations/dogs')
const schemas = require('./../validations/schemas/dogs')

const getAll = async(ctx)  => {
  ctx.body = await operations.getAll()
}

const getById = async (ctx) => {
  const input = {
    id: parseInt(ctx.params.id),
  }
  validate(schemas.dogId, input)
  ctx.body = await operations.getById(input)
}

const createDog = async (ctx) => {
  const input = {
    name: ctx.request.body.name,
    breed: ctx.request.body.breed,
    birthYear: parseInt(ctx.request.body.birthYear),
    photo: ctx.request.body.photo,
  }
  validate(schemas.dog, input)
  const response = await operations.createDog(input)
  ctx.status = 201
  ctx.body = response
}

module.exports = {
  getAll,
  getById,
  createDog,
}