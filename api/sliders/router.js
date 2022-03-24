const express = require('express')
const router = express.Router()
const Controller = require('./index')
const Response = require('./../../utils/response')

const jwt = require('../middlewares/jwt')
const schema = require('./../../db/schemas/user.json')
const Schema = require('./../middlewares/schema')(schema)

router.get('/sliders', (req, res, next) => {
	Controller.getSlider(req, res)
		.then((resp) => Response.success(req, res, resp.msg, resp.status))
		.catch(next)
})

module.exports = router
