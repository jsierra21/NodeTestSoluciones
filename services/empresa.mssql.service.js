const Queries = require('./../db/queries')
const log4js = require('./../utils/log4js')()
const mensajes = require('./../utils/messages/message')

const getEmpresa = async () => {
	try {
		return await Queries.querySP('[par].[spGetEmpresa]', [])
	} catch (e) {
		log4js.error(`[action: getEmpresa empresa.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

module.exports = {
	getEmpresa,
}
