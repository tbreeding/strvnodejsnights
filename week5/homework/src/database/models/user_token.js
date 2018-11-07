
'use strict'

const Base = require('./base')

class User_token extends Base {
    static get tableName() {
        return 'user_tokens'
      }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'userId',
                'token',
            ],
            properties: {
                id: {
                    type: 'integer',
                },
                userId: {
                    type: 'integer',
                },
                token: {
                    type: 'string',
                },
            },
        }
    }
    static get relationMappings() {
        const User = require('./user')

        return {
            user: {
                relation: Base.BelongsToOneRelation,
                modelClass: User,
                join: {
                from: 'user_tokens.userId',
                to: 'users.id'
                }
            },
        }
    }
}

module.exports = User_token