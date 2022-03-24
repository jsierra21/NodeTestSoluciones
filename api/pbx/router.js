const express = require('express')
const router = express.Router()
const response = require('./../../utils/response')
const Controller = require('./index')

const jwt = require('./../middlewares/jwt')

router
	.get('/pbx', [jwt.isAuth], (req, res, next) => {
		Controller.pbx(req, res)
			.then((result) => response.success(req, res, result.msg, result.status))
			.catch(next)
	})

module.exports = router
