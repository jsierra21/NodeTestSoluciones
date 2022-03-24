'use strict'
/**
 * @name SaldoCtaContrato
 * @type function
 * @description Función encargada de realizar la consulta con Sequelize
 * @author Alfonso Navarro <alfonso.navarron@syspotec.com>
 */

const Query = require('./../db/queries')
const mensajes = require('./../utils/messages')
const log4js = require('./../utils/log4js')()

const getStadisticSp = async () => {
	try {
		return await Query.querySP('[report].[spStadistic]', [])
	} catch (e) {
		log4js.error(`[action: getStadisticSp stadistic.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error('Server error interno')
	}
}

module.exports = {
	getStadisticSp,
}
