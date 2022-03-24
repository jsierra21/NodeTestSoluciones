const router = require('express').Router()
const Controller = require('./index')
const response = require('../../utils/response')

const jwt = require('../middlewares/jwt')
// const schema = require('../../db/schemas/user.json')
// const Schema = require('../middlewares/schema')(schema)

router
	.get('/serviciosReports/:servicioId', [jwt.isAuth], async (req, res, next) => {
		Controller.serviciosReports(req, res)
			.then((resp) => {
				console.log(`Exitoso!!!`)
			})
			.catch(next)
	})
	.get('/informesGenericos/:tipoInforme', [jwt.isAuth], async (req, res, next) => {
		Controller.informesGenericos(req, res)
			.then((resp) => {
				console.log(`Exitoso!!!`)
			})
			.catch(next)
	})

module.exports = router
