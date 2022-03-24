const router = require('express').Router()
const Controller = require('./index')
const Response = require('./../../utils/response')
const jwt = require('./../middlewares/jwt')

const schema = require('./../../db/schemas/newSolicitud.json')
const Schema = require('./../middlewares/schema')(schema)

router
	.get('/validateActiveSolicitud/:userId', [jwt.isAuth], (req, res, next) => {
		Controller.validateActiveSolicitud(req, res)
			.then((resp) => Response.success(req, res, resp.msg, resp.status))
			.catch(next)
	})
	.get('/consultarServicioSolicitado/:id', [jwt.isAuth], async (req, res, next) => {
		Controller.getConsultarServicioSolicitado(req, res)
			.then((resp) => Response.success(req, res, resp.msg, resp.status))
			.catch(next)
	})
	.get('/stateServiceUser/:id', [jwt.isAuth], async (req, res, next) => {
		Controller.getStateServiceUser(req, res)
			.then((resp) => Response.success(req, res, resp.msg, resp.status))
			.catch(next)
	})
	.get('/validateCountSolicitudServicioJuridico/:id', [jwt.isAuth], async (req, res, next) => {
		Controller.getCountSolicitudServicioJuridico(req, res)
			.then((resp) => Response.success(req, res, resp.msg, resp.status))
			.catch(next)
	})
	.get('/searchSolicitudServicio/:search', [jwt.isAuth], async (req, res, next) => {
		Controller.searchSolicitudServicio(req, res)
			.then((result) => Response.success(req, res, result.msg, result.status))
			.catch(next)
	})
	.post('/newServiciosSolicitados', [Schema.cleaner, Schema.validate, jwt.isAuth], async (req, res, next) => {
		Controller.newServiciosSolicitados(req, res)
			.then((resp) => Response.success(req, res, resp.msg, resp.status))
			.catch(next)
	})
	.post('/saveServiciosSolicitadosDocuments', [jwt.isAuth], async (req, res, next) => {
		Controller.saveServiciosSolicitadosDocuments(req, res)
			.then((resp) => Response.success(req, res, resp.msg, resp.status))
			.catch(next)
	})
	.get('/listaServicioSolicitado/:servicioId', [jwt.isAuth], async (req, res, next) => {
		Controller.listaSolicitudesServicio(req, res)
			.then((resp) => Response.success(req, res, resp.msg, resp.status))
			.catch(next)
	})
	.post('/listaServicioSolicitadoFin', [jwt.isAuth], async (req, res, next) => {
		Controller.listaSolicitudesServicioFin(req, res)
			.then((resp) => Response.success(req, res, resp.msg, resp.status))
			.catch(next)
	})
	.post('/oneServicioSolicitado', [jwt.isAuth], async (req, res, next) => {
		Controller.OneSolicitudesServicio(req, res)
			.then((resp) => Response.success(req, res, resp.msg, resp.status))
			.catch(next)
	})
	.post('/comentario', [jwt.isAuth], async (req, res, next) => {
		Controller.guardarComentario(req, res)
			.then((resp) => Response.success(req, res, resp.msg, resp.status))
			.catch(next)
	})
	.post('/finServicioSolicitado', [jwt.isAuth], async (req, res, next) => {
		Controller.finalizarServicioSolicitado(req, res)
			.then((resp) => Response.success(req, res, resp.msg, resp.status))
			.catch(next)
	})
	.put('/updateServicioSolicitado/:id', jwt.isAuth, async (req, res, next) => {
		Controller.deleteServicioSolicitado(req, res)
			.then((resp) => Response.success(req, res, resp.msg, resp.status))
			.catch(next)
	})
	.put('/deleteOtroDocumentFromDatabase/:serviciosSolicitadosDocumentosId', jwt.isAuth, async (req, res, next) => {
		Controller.deleteOtroDocumentFromDatabase(req, res)
			.then((resp) => Response.success(req, res, resp.msg, resp.status))
			.catch(next)
	})

module.exports = router
