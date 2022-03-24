'use strict'
const service = require('./../../services/cargaInicial.mssql.service')

const Response = require('./../../utils/response')
const log4js = require('./../../utils/log4js')()

module.exports = function () {
	return {
		userTypeCargaInitial: async (req, res) => {
			try {
				const result = await service.getCargaInitial('register')
				if (result.length === 0) {
					throw Response.error(req, res, 'No se encontraron registros de logs', 400)
				} else {
					return { msg: result.recordsets, status: 200 }
				}
			} catch (e) {
				log4js.error(`[action: userTypeCargaInitial CargaInitial.controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, 'Internal Error Server', 400)
			}
		},
		contratoCargaInitial: async (req, res) => {
			try {
				const result = await service.getCargaInitial('contrato')
				if (result.length === 0) {
					throw Response.error(req, res, 'No se encontraron registros de logs', 400)
				} else {
					return { msg: result.recordsets, status: 200 }
				}
			} catch (e) {
				log4js.error(`[action: contratoCargaInitial CargaInitial.controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, 'Internal Error Server', 400)
			}
		},
	}
}
