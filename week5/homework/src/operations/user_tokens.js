'use strict'

const userTokensRepository = require('../repositories/user_tokens')

const create = async userId => await userTokensRepository.create(userId)

const deleteAllByUserId = async userId => await userTokensRepository.deleteAllByUserId(userId)

module.exports = {
    create,
    deleteAllByUserId
}