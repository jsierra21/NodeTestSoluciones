const service = require('./../../services/selectorFind.mssql.service')
const Response = require('./../../utils/response')
const log4js = require('./../../utils/log4js')()

const servicios = () => {
	return {
		selectorFind: async (req, res) => {
			try {
				const { recordset } = await service.selectorFind(req.query)
				return { msg: recordset, status: 200 }
			} catch (e) {
				log4js.error(`[action: selectorFind selectorFind.controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, `Error interno en el servidor`, 400)
			}
		},
	}
}

module.exports = servicios
