
'use strict'

const Base = require('./base')

class User extends Base {
    static get tableName() {
        return 'users'
      }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'email',
                'name',
                'password',
            ],
            properties: {
                id: {
                    type: 'integer',
                },
                email: {
                    type: 'string',
                },
                name: {
                    type: 'string',
                },
                password: {
                    type: 'string',
                },
                disabled: {
                    type: 'boolean',
                },
            },
        }
    }

    static get relationMappings() {
        const Dog = require('./dog')
        const User_token = require('./user_token')

        return {
            dogs: {
                relation: Base.HasManyRelation,
                modelClass: Dog,
                join: {
                    from: 'users.id',
                    to: 'dogs.ownerId'
                }
            },
            user_tokens: {
                relation: Base.HasManyRelation,
                modelClass: User_token,
                join: {
                    from: 'users.id',
                    to: 'user_tokens.userId'
                }
            },
        }
    }
}

module.exports = User