'use strict'
const service = require('./../../services/listAfiliados.mssql.service')

const Response = require('./../../utils/response')
const log4js = require('./../../utils/log4js')()

module.exports = function () {
	return {
		getListAfiliados: async (req, res) => {
			try {
				const result = await service.getListAfiliados()
				if (result.length === 0) {
					throw Response.error(req, res, 'No se encontraron registros de logs', 400)
				} else {
					return { msg: result.recordset, status: 200 }
				}
			} catch (e) {
				log4js.error(`[action: getListAfiliados getListAfiliados.controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, 'Internal Error Server', 400)
			}
		},
	}
}
