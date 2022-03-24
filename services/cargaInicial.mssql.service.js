const Queries = require('./../db/queries')
const log4js = require('./../utils/log4js')()

const getCargaInitial = async (action) => {
	try {
		return await Queries.querySP('[par].[spCargaInicial]', [{ action }])
	} catch (e) {
		log4js.error(`[action: getCargaInitial getCargaInitial.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

module.exports = {
	getCargaInitial,
}
