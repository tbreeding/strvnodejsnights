'use-strict'

const Router = require('koa-router');
const { validate } = require('./utils/validator')
const {
    getAllDogs,
    getDog,
    createDog,
    updateDog,
    deleteDog
} = require('./io/io');

const router = new Router();

// Get a list of all of the dogs
router.get('/dogs', ctx => {
    ctx.body = getAllDogs()
})

// 'Retreive' (see what I did there?) a specific dog
router.get('/dogs/:id', ctx => {
    ctx.body = getDog(Number(ctx.params.id));
})

// Create a new dog
router.post('/dogs', ctx => {

    const schema = {
        type: 'Object',
        required: true,
        properties: {
          name: {
            type: 'string',
            required: true,
          },
          breed: {
            type: 'string',
            required: true,
          },
          birthYear: {
            type: 'number',
          },
          photo: {
            type: 'string',
            format: 'url',
          },
        },
      }
      data = {
          ...ctx.request.body
      }
      if (data.birthYear) data.birthYear = Number(data.birthYear)

      const validation = validate(data, schema)

      if (!validation.valid) {
        ctx.status = 400
        ctx.body = {
          errors: validation.errors,
        }

        return
      }
      const newDog = createDog(data)
      ctx.body = JSON.stringify(newDog)
})

// Update an Existing Dog
router.post('/dogs/:id', ctx => {

})

// Put a dog down
router.delete('/dogs/:id', ctx => {

})

module.exports = router.routes()