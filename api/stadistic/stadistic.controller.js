'use strict'

const Response = require('../../utils/response')
const log4js = require('./../../utils/log4js')()
const service = require('./../../services/stadistic.mssql.service')

module.exports = function () {
	return {
		stadistic: async (req, res) => {
			try {
				const { recordset } = await service.getStadisticSp()
				return { msg: recordset, status: 200 }
			} catch (e) {
				log4js.error(`[action: stadistic stadistic.controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, 'Internal Error Server', 400)
			}
		},
	}
}
