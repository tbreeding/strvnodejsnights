
'use strict'

const jsonschema = require('jsonschema')
const errors = require('../utils/errors')
const logger = require('../utils/logger')

const validate = (schema, inputData) => {
  const validator = new jsonschema.Validator()
  schema.additionalProperties = false
  const validationErrors = validator.validate(inputData, schema).errors
  if (validationErrors.length > 0) {
    logger.info(validationErrors)
    throw new errors.ValidationError()
  }
}

const getUpdateSchema = (schema, input) => {
  const updateSchema = {}
  updateSchema.type = schema.type
  updateSchema.required = schema.required
  updateSchema.properties = {}
  for(const key in input) {
    updateSchema.properties[key] = schema.properties[key]
  }
  return updateSchema
}

module.exports = {
  validate,
  getUpdateSchema,
}