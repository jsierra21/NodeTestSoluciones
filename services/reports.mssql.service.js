'use strict'
/**
 * @name reports
 * @type function
 * @description Función encargada de realizar la consulta con Sequelize
 * @author Alfonso Navarro <alfonso.navarron@syspotec.com>
 */

const Query = require('./../db/queries')
const mensajes = require('./../utils/messages')
const log4js = require('./../utils/log4js')()

const serviciosReports = async (req) => {
	try {
		const { servicioId } = req.params
		const { fDesde, fHasta, action } = req.query

		const params = { servicioId, fDesde, fHasta, action }
		return await Query.querySP('[report].[spReportsSolicitudes]', [params])
	} catch (e) {
		log4js.error(`[action: serviciosReports reports.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error('Server error interno')
	}
}

const informesGenericos = async (req) => {
	try {
		const { tipoInforme } = req.params
		const { fDesde, fHasta } = req.query

		const params = { fDesde, fHasta, tipoInforme }
		return await Query.querySP('[report].[spReportsAfiliadosReports]', [params])
	} catch (e) {
		log4js.error(`[action: afiliadosReports reports.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error('Server error interno')
	}
}

module.exports = {
	serviciosReports,
	informesGenericos,
}
