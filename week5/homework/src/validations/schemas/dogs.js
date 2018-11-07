
'use strict'

const dogId = {
  type: 'Object',
  required: true,
  properties: {
    id: { type: 'integer', required: true, min: 1, max: 99999999 },
  },
}

const dog = {
  type: 'Object',
  required: true,
  properties: {
    name: { type: 'string', required: true },
    breed: { type: 'string', required: true },
    birthYear: { type: 'number' },
    photo: { type: 'string', format: 'url' },
    ownerId: { type: 'number', required: true},
  },
}

const updateDog = {
  type: 'Object',
  required: true,
  properties: {
    name: { type: 'string' },
    breed: { type: 'string' },
    birthYear: { type: 'number' },
    photo: { type: 'string', format: 'url' },
    ownerId: { type: 'number' },
  },
}

module.exports = {
  dogId,
  dog,
  updateDog,
}