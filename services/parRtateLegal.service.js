const Query = require('../db/queries')
const mensajes = require('../utils/messages/message')
const log4js = require('../utils/log4js')()

async function getParRtateLegal() {
	try {
		const query = `
			SELECT TOP (1) [id]
          ,[nameEmpresa]
          ,[nameRrptateLegal]
          ,[cedulaRrptateLegal]
          ,[UrlFirmaRrptateLegal]
      FROM [par].[contrato] (nolock)
    `
		const { recordset } = await Query.queryInject(query, [{}])
		return recordset
	} catch (e) {
		log4js.error(`[action: getAll parents.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

module.exports = {
	getParRtateLegal,
}
