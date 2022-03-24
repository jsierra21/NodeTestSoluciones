'use strict'
const service = require('./../../services/pbx.mssql.service')

const Response = require('./../../utils/response')
const log4js = require('./../../utils/log4js')()

module.exports = function () {
	return {
		pbx: async (req, res) => {
			try {
				const { recordset } = await service.getPbx()
				return { msg: recordset, status: 200 }
			} catch (e) {
				log4js.error(`[action get: pbx pbx.controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, 'Internal Error Server', 400)
			}
		},
	}
}
