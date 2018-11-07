'use strict'
const errors = require('../utils/errors')
const Dog = require('../database/models/dog')
const log = require('../utils/logger')

const findAll = () => Dog.query()

const findById = async (id) => {
  const dog = await Dog.query()
    .findById(id)
  if(!dog) throw new errors.NotFoundError()

  return dog
}

const create = async (attributes) => {
  const dog = await Dog.query()
    .insertAndFetch(attributes)

  log.info('Dog created:', dog.id)

  return dog
}

const update = async ({id, attributes}) => {
  const dog = await Dog.query()
    .patchAndFetchById(id, attributes)

  log.info('Dog updated:', id)

  return dog
}

const destroy = async (id) => {
  const dog = await Dog.query()
    .findById(id)
  if(!dog) throw new errors.NotFoundError()
  await Dog.query().deleteById(id)

  log.info('Dog deleted', dog)

  return {
    message: 'Dog successfully deleted',
    dog,
  }
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  destroy,
}