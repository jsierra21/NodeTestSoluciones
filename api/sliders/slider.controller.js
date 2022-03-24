'use strict'

const Response = require('../../utils/response')
const log4js = require('./../../utils/log4js')()
const service = require('./../../services/slider.mssql.service')

module.exports = function () {
	return {
		getSlider: async (req, res) => {
			try {
				//const { recordset } = await service.getAll()
				const { recordset } = await service.getAllSliderSP()
				return { msg: recordset, status: 200 }
			} catch (e) {
				log4js.error(`[action: getSlider slider.controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, 'Internal Error Server', 400)
			}
		},
	}
}
