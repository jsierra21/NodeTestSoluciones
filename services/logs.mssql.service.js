const Queries = require('./../db/queries')
const log4js = require('./../utils/log4js')()

const getById = async (userId) => {
	const query = `
    SELECT l.cuentaId, c.cuentaContrato, l.observacion, l.idAccion, l.createdAt
		FROM [dbo].[logs] l (nolock)
		INNER JOIN [dbo].ccontratos c ON l.cuentaId = c.id
		WHERE l.userId = ${userId}
		ORDER BY l.id DESC
    `
	return await Queries.query(query)
}

module.exports = {
	getById,
}
