'use strict'

module.exports = {
    up: knex => knex.schema.createTable('user_tokens', table => {
      table.increments('id').primary()
      table.integer('user_id').notNullable()
      table.string('token').unique().notNullable()
      table.timestamps()
    }),

    down: knex => knex.schema.dropTableIfExists('user_tokens'),
  }