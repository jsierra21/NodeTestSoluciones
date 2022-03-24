const service = require('./../../services/reports.mssql.service')
const Response = require('./../../utils/response')
const log4js = require('./../../utils/log4js')()
const excelToJs = require('../../utils/excel/excelToJs')

const reports = () => {
	return {
		serviciosReports: async (req, res) => {
			try {
				const { recordset } = await service.serviciosReports(req)

				return await excelToJs.toExcel(res, recordset, 'serviciosSolicitados')
			} catch (e) {
				log4js.error(`[action: serviciosReports report.controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, `Error interno en el servidor`, 400)
			}
		},
		informesGenericos: async (req, res) => {
			try {
				const { recordset } = await service.informesGenericos(req)

				return await excelToJs.toExcel(res, recordset, 'serviciosSolicitados')
			} catch (e) {
				log4js.error(`[action: informesGenericos report.controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, `Error interno en el servidor`, 400)
			}
		},
	}
}

module.exports = reports
