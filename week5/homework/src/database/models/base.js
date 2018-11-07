
'use strict'

const {Model} = require('../index')

class Base extends Model {
  $beforeInsert() {
    this.updatedAt = this.createdAt = this.createdAt || new Date()
  }

  $beforeUpdate() {
    this.updatedAt = new Date()
  }
}

module.exports = Base