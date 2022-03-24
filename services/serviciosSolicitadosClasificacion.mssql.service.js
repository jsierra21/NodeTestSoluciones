const Query = require('../db/queries')
const mensajes = require('../utils/messages/message')
const log4js = require('../utils/log4js')()

async function getAll(servicioId) {
	try {
		return await Query.querySP('[doc].[spGetListClasificacion]', [{ servicioId }])
	} catch (e) {
		log4js.error(
			`[action: getAll serviciosSolicitadosClasificacion.mssql.service][msg: ${e.message}][file:${__filename}]`
		)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

module.exports = {
	getAll,
}
