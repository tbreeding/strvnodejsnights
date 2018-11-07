'use strict'

const objection = require('objection')
const pg = require('pg')

pg.types.setTypeParser(20, 'text', parseInt)
pg.types.setTypeParser(1700, 'text', parseFloat)

const knexLib = require('knex')
const R = require('ramda')
const config = require('../config')
const knexEnvConfig = require('./knexfile')[config.env]

const knexConfig = R.mergeDeepWith({}, knexEnvConfig, objection.knexSnakeCaseMappers())
const knex = knexLib(knexConfig)

const Model = objection.Model
Model.knex(knex)
const transaction = objection.transaction

function connect() {
  return knex.raw('select 1 + 1')
}

function close() {
  return knex.destroy()
}

module.exports = {
  Model,
  knex,
  transaction,
  connect,
  close,
}