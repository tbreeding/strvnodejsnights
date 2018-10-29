'use strict'

const R = require('ramda')
const errors = require('../utils/errors')
const fs = require('fs')
const dogs = require('./../database/dogs.json')

const DOGS_DB = `${__dirname}/../database/dogs.json`;

const findAll = () => JSON.parse(fs.readFileSync(DOGS_DB))

const findById = (id) => {
  const dogs = JSON.parse(fs.readFileSync(DOGS_FILE));
  const dog = R.find(R.propEq('id', id), dogs)
  if (!dog) {
    throw new errors.NotFoundError()
  }
  return dog
}

const create = (dog) => {
  const DOGS = JSON.parse(fs.readFileSync(DOGS_FILE));
  const dogId = DOGS.length + 1
  const newDog = {
      id: dogId,
      ...dog,
  }
  DOGS.push(newDog)
  fs.writeFileSync(DOGS_FILE, JSON.stringify(DOGS, null, 4))
  return newDog;
}

module.exports = {
  findAll,
  findById,
  create,
}