const express = require('express')
const router = express.Router()
const Controller = require('./index')
const response = require('./../../utils/response')

const schema = require('./../../db/schemas/auth.json')
const Schema = require('./../middlewares/schema')(schema)

router
	.post('/AdminAuth', [Schema.cleaner, Schema.validate], (req, res, next) => {
		Controller.authAdminMsSql(req, res)
			.then((resp) => response.success(req, res, resp.msg, resp.status))
			.catch(next)
	})
	.post('/MobileAuth', [Schema.cleaner, Schema.validate], (req, res, next) => {
		Controller.authMobileMsSql(req, res)
			.then((resp) => response.success(req, res, resp.msg, resp.status))
			.catch(next)
	})
	.post('/auth/recoverypass', (req, res, next) => {
		Controller.recoverypassmb(req, res)
			.then((resp) => response.success(req, res, resp.msg, resp.status))
			.catch(next)
	})

module.exports = router
