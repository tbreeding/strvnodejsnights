'use strict'

const dogRepository = require('./../repositories/dogs')

const getAll = async () => await dogRepository.findAll()

const getById = async input => await dogRepository.findById(input.id)

const create = async input => await dogRepository.create(input)

const update = async input => await dogRepository.update(input)

const destroy = async input => await dogRepository.destroy(input.id)

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy,
}