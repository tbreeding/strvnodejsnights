'use strict'

const User_token = require('../database/models/user_token')
const log = require('../utils/logger')
const crypto = require('../utils/crypto')

const create = async userId => {
    const user_token = await User_token.query()
        .insertAndFetch({
        userId,
        token: await crypto.generateAccessToken(userId)
    })
    log.info('Token Created for user:', userId);
    return user_token.token
}

const deleteAllByUserId = async userId => {
    const tokens = await User_token
        .query()
        .delete()
        .where('userId', '=', userId)
    log.info(`Deleted ${tokens} user tokens for user id ${userId}`)
    return tokens
}

const destroy = (id) => {

}

module.exports = {
    create,
    deleteAllByUserId,
    destroy,
}