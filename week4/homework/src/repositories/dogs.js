'use strict'

const R = require('ramda')
const errors = require('../utils/errors')
const fs = require('fs')

const DOGS_DB = `${__dirname}/../database/dogs.json`;

const findAll = () => JSON.parse(fs.readFileSync(DOGS_DB))

const findById = (id) => {
  const dogs = JSON.parse(fs.readFileSync(DOGS_DB));
  const dog = R.find(R.propEq('id', id), dogs)
  if (!dog) {
    throw new errors.NotFoundError()
  }
  return dog
}

const create = (dog) => {
  const DOGS = JSON.parse(fs.readFileSync(DOGS_DB));
  const dogId = DOGS.length + 1
  const newDog = {
      id: dogId,
      ...dog,
  }
  DOGS.push(newDog)
  fs.writeFileSync(DOGS_DB, JSON.stringify(DOGS, null, 4))
  return newDog;
}

const update = (dogToUpdate) => {
  const DOGS = JSON.parse(fs.readFileSync(DOGS_DB));
  for(dog of DOGS) {
    if(dog.id === dogToUpdate.id) {
      dog.name = dogToUpdate.name ? dogToUpdate.name : dog.name
      dog.breed = dogToUpdate.breed ? dogToUpdate.breed : dog.breed
      dog.photo = dogToUpdate.photo ? dogToUpdate.photo : dog.photo
    }
  }
}

module.exports = {
  findAll,
  findById,
  create,
  update
}