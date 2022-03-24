const express = require('express')
const router = express.Router()
const response = require('../../utils/response')
const Controller = require('./index')

router
	.get('/userTypeCargaInitial', (req, res, next) => {
		Controller.userTypeCargaInitial(req, res)
			.then((resp) => response.success(req, res, resp.msg, resp.status))
			.catch(next)
	})
	.get('/contratoCargaInitial', (req, res, next) => {
		Controller.contratoCargaInitial(req, res)
			.then((resp) => response.success(req, res, resp.msg, resp.status))
			.catch(next)
	})

module.exports = router
