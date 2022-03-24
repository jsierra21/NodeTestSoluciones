const router = require('express').Router()
const Controller = require('./index')
const Response = require('./../../utils/response')
const jwt = require('./../middlewares/jwt')

const schema = require('./../../db/schemas/newContrato.json')
const Schema = require('./../middlewares/schema')(schema)

router.get('/selectorFind', [jwt.isAuth], async (req, res, next) => {
	Controller.selectorFind(req, res)
		.then((resp) => Response.success(req, res, resp.msg, resp.status))
		.catch(next)
})

module.exports = router
