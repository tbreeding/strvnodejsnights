'use strict'

const R = require('ramda')
const fs = require('fs')
const errors = require('../utils/errors')
const users = require('../database/users.json')

const USERS_DB = `${__dirname}/../database/users.json`;

const findAll = () => JSON.parse(fs.readFileSync(USERS_DB))

const findById = (id) => {
  const users = JSON.parse(fs.readFileSync(USERS_DB));
  const user = R.find(R.propEq('id', id), users)
  if (!user) {
    throw new errors.NotFoundError()
  }
  return user
}

function findByEmail(email) {
  const users = JSON.parse(fs.readFileSync(USERS_DB));
  return R.find(R.propEq('email', email), users)
}

const create = (user) => {
  const USERS = JSON.parse(fs.readFileSync(USERS_DB));
  const userId = USERS.length + 1
  const newUser = {
      id: userId,
      ...user,
  }
  USERS.push(newUser)
  fs.writeFileSync(USERS_DB, JSON.stringify(USERS, null, 4))
  return newUser;
}

const save = (input) => {
  let users = JSON.parse(fs.readFileSync(USERS_DB));
  users = users.filter(user => user.id !== input.id)
  users.push(input)
  fs.writeFileSync(USERS_DB, JSON.stringify(users, null, 4))
}

module.exports = {
  findAll,
  findById,
  findByEmail,
  create,
  save,
}