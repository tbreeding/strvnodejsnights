'use strict'

const { validate, getUpdateSchema } = require('./../validations')
const operations = require('./../operations/dogs')
const schemas = require('./../validations/schemas/dogs')
const { getParsedObject } = require('../utils/parseInput')

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

const create = async (ctx) => {
  const input = {
    name: ctx.request.body.name,
    breed: ctx.request.body.breed,
    birthYear: parseInt(ctx.request.body.birthYear),
    photo: ctx.request.body.photo,
    ownerId: parseInt(ctx.request.body.ownerId),
  }
  validate(schemas.dog, input)
  const response = await operations.create(input)
  ctx.status = 201
  ctx.body = response
}

const update = async (ctx) => {
  const input = {
    id: parseInt(ctx.params.id),
    attributes: getParsedObject(schemas.updateDog, ctx.request.body),
  }
  validate(getUpdateSchema(schemas.updateDog, input.attributes), input.attributes)
  ctx.body = await operations.update(input)
}

const destroy = async (ctx) => {
  const input = {
    id: parseInt(ctx.params.id),
  }
  validate(schemas.dogId, input)
  ctx.body = await operations.destroy(input)
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy,
}