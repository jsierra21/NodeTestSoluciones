const router = require('express').Router()
const Controller = require('./index')
const Response = require('./../../utils/response')
const jwt = require('./../middlewares/jwt')

const schema = require('./../../db/schemas/newContrato.json')
const Schema = require('./../middlewares/schema')(schema)

router
	.get('/services', [jwt.isAuth], async (req, res, next) => {
		Controller.getAll(req, res)
			.then((resp) => Response.success(req, res, resp.msg, resp.status))
			.catch(next)
	})
	.get('/filterservices/:userTypeId', [jwt.isAuth], async (req, res, next) => {
		Controller.getFilterService(req, res)
			.then((resp) => Response.success(req, res, resp.msg, resp.status))
			.catch(next)
	})
	.get('/listAdquiridos/:userId', [jwt.isAuth], async (req, res, next) => {
		Controller.getListAdquiridos(req, res)
			.then((resp) => Response.success(req, res, resp.msg, resp.status))
			.catch(next)
	})
	.get('/documentList/:id', [jwt.isAuth], async (req, res, next) => {
		Controller.getListDocument(req, res)
			.then((resp) => Response.success(req, res, resp.msg, resp.status))
			.catch(next)
	})
	.get('/listSolicitados/:id', [jwt.isAuth], async (req, res, next) => {
		Controller.getListSolicitados(req, res)
			.then((resp) => Response.success(req, res, resp.msg, resp.status))
			.catch(next)
	})
	.get('/validateGrupoServicio/:id', [jwt.isAuth], async (req, res, next) => {
		Controller.validateGrupoServicio(req, res)
			.then((resp) => Response.success(req, res, resp.msg, resp.status))
			.catch(next)
	})

module.exports = router
