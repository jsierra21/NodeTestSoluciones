const service = require('./../../services/parents.mssql.service')
const Response = require('./../../utils/response')
const log4js = require('./../../utils/log4js')()

const servicios = () => {
	return {
		getAll: async (req, res) => {
			try {
				const { recordset } = await service.getAll()
				return { msg: recordset, status: 200 }
			} catch (e) {
				log4js.error(`[action: getAll parents.controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, `Error interno en el servidor`, 400)
			}
		},
	}
}

module.exports = servicios
