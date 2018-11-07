
'use strict'

const Base = require('./base')

class Dog extends Base {
    static get tableName() {
        return 'dogs'
      }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'name',
                'breed',
                'ownerId',
            ],
            properties: {
                id: {
                    type: 'integer',
                },
                name: {
                    type: 'string',
                },
                breed: {
                    type: 'string',
                },
                ownerId: {
                    type: 'integer',
                },
                birthYear: {
                    type: 'integer',
                },
                photo: {
                    type: 'string,'
                },
                disabled: {
                    type: 'boolean',
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
                from: 'dogs.owenerId',
                to: 'users.id'
                }
            },
        }
    }
}

module.exports = Dog