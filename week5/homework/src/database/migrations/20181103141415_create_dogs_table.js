'use strict'

module.exports = {
    up: knex => knex.schema.createTable('dogs', table => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('breed').notNullable()
      table.integer('owner_id').notNullable()
      table.integer('birth_year')
      table.string('photo')
      table.boolean('disabled')
      table.timestamps()
    }),

    down: knex => knex.schema.dropTableIfExists('dogs'),
  }
