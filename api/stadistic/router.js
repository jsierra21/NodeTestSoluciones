const express = require('express')
const router = express.Router()
const Controller = require('./index')
const Response = require('./../../utils/response')

const jwt = require('../middlewares/jwt')

router.get('/stadistic', [jwt.isAuth], (req, res, next) => {
	Controller.stadistic(req, res)
		.then((resp) => Response.success(req, res, resp.msg, resp.status))
		.catch(next)
})

module.exports = router
