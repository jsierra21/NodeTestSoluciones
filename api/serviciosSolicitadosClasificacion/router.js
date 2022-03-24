const router = require('express').Router()
const Controller = require('./index')
const Response = require('./../../utils/response')
const jwt = require('./../middlewares/jwt')

router.get('/serviciosSolicitadosClasificacion/:servicioId', (req, res, next) => {
	Controller.getAll(req, res)
		.then((resp) => Response.success(req, res, resp.msg, resp.status))
		.catch(next)
})

module.exports = router
