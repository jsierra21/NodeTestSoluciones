const express = require('express')
const router = express.Router()
const response = require('./../../utils/response')
const Controller = require('./index')

const jwt = require('../middlewares/jwt')
const schema = require('./../../db/schemas/newContrato.json')
const Schema = require('./../middlewares/schema')(schema)

router
	.get('/newContract', [jwt.isAuth], (req, res, next) => {
		Controller.getById(req, res)
			.then((resp) => response.success(req, res, resp.msg, resp.status))
			.catch(next)
	})
	.get('/validateHasBeneficiario/:groupId', (req, res, next) => {
		Controller.validateGroupServiceHasBeneficiario(req, res)
			.then((resp) => response.success(req, res, resp.msg, resp.status))
			.catch(next)
	})
	.post('/newContract', [Schema.validate, Schema.cleaner, jwt.isAuth], (req, res, next) => {
		Controller.saveNewContrato(req, res)
			.then((resp) => response.success(req, res, resp.msg, resp.status))
			.catch(next)
	})
	.get('/listaContratos', (req, res, next) => {
		Controller.getListaContraros(req, res)
			.then((resp) => response.success(req, res, resp.msg, resp.status))
			.catch(next)
	})
	.post('/updateEstado', [jwt.isAuth], (req, res, next) => {
		Controller.updateEstado(req, res)
			.then((resp) => response.success(req, res, resp.msg, resp.status))
			.catch(next)
	})
	.post('/deBajaUpdateEstado', [jwt.isAuth], (req, res, next) => {
		Controller.updateEstadoDeBaja(req, res)
			.then((resp) => response.success(req, res, resp.msg, resp.status))
			.catch(next)
	})
	.post('/infoContrato', [jwt.isAuth], (req, res, next) => {
		Controller.getInfoContrato(req, res)
			.then((resp) => response.success(req, res, resp.msg, resp.status))
			.catch(next)
	})
	.post('/updateUser', [jwt.isAuth], (req, res, next) => {
		Controller.updateUser(req, res)
			.then((resp) => response.success(req, res, resp.msg, resp.status))
			.catch(next)
	})
	.post('/updContrato', [jwt.isAuth], (req, res, next) => {
		Controller.updateContrato(req, res)
			.then((resp) => response.success(req, res, resp.msg, resp.status))
			.catch(next)
	})

module.exports = router
