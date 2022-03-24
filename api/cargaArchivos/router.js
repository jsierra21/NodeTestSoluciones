const express = require('express')
const router = express.Router()
const response = require('./../../utils/response')
const Controller = require('./index')

const jwt = require('./../middlewares/jwt')

router
	.get('/parametros', [jwt.isAuth], (req, res, next) => {
		Controller.parametros(req, res)
			.then((result) => response.success(req, res, result.msg, result.status))
			.catch(next)
	})
	.get('/cargaArchivos', [jwt.isAuth], (req, res, next) => {
		Controller.getListDescuentoNomina(req, res)
			.then((result) => response.success(req, res, result.msg, result.status))
			.catch(next)
	})
	.get('/validateExistCargaArchivos', [jwt.isAuth], (req, res, next) => {
		Controller.validateExistCargaArchivos(req, res)
			.then((result) => response.success(req, res, result.msg, result.status))
			.catch(next)
	})
	.get('/nuevosAfialidos', [jwt.isAuth], (req, res, next) => {
		Controller.getListnuevosAfialidos(req, res)
			.then((result) => response.success(req, res, result.msg, result.status))
			.catch(next)
	})
	.get('/bajaAfialidos', [jwt.isAuth], (req, res, next) => {
		Controller.getListBajaAfialidos(req, res)
			.then((result) => response.success(req, res, result.msg, result.status))
			.catch(next)
	})
	.post('/descuentoNomina', [jwt.isAuth], (req, res, next) => {
		Controller.descuentoNomina(req, res)
			.then((result) => response.success(req, res, result.msg, result.status))
			.catch(next)
	})
	.post('/nuevosAfialidos', [jwt.isAuth], (req, res, next) => {
		Controller.nuevosAfialidos(req, res)
			.then((result) => response.success(req, res, result.msg, result.status))
			.catch(next)
	})
	.post('/bajaAfiliados', [jwt.isAuth], (req, res, next) => {
		Controller.bajaAfiliados(req, res)
			.then((result) => response.success(req, res, result.msg, result.status))
			.catch(next)
	})
	.put('/deleteDescuentoNomina', [jwt.isAuth], (req, res, next) => {
		Controller.deleteDescuentoNomina(req, res)
			.then((result) => response.success(req, res, result.msg, result.status))
			.catch(next)
	})
	.put('/LoadFileNewAfiliadosDelete', [jwt.isAuth], (req, res, next) => {
		Controller.deleteLoadFileNewAfiliados(req, res)
			.then((result) => response.success(req, res, result.msg, result.status))
			.catch(next)
	})
	.put('/cargaFileBajaAfiliadosDelete', [jwt.isAuth], (req, res, next) => {
		Controller.deleteLoadFileBajaAfiliados(req, res)
			.then((result) => response.success(req, res, result.msg, result.status))
			.catch(next)
	})

module.exports = router
