const Query = require('../db/queries')
const mensajes = require('../utils/messages/message')
const log4js = require('../utils/log4js')()

async function getAll() {
	try {
		const query = `
			SELECT * 
			FROM [dbo].[parents] (nolock)
			ORDER BY description ASC
    `
		return await Query.queryInject(query, [{}])
	} catch (e) {
		log4js.error(`[action: getAll parents.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

module.exports = {
	getAll,
}
