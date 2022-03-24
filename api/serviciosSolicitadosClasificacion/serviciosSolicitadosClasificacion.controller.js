const service = require('../../services/serviciosSolicitadosClasificacion.mssql.service')
const Response = require('./../../utils/response')
const log4js = require('./../../utils/log4js')()

function controller() {
	return {
		getAll: async (req, res) => {
			try {
				const resultado = await service.getAll(req.params.servicioId)
				return { msg: resultado.recordset, status: 200 }
			} catch (e) {
				console.log(e)
				log4js.error(
					`[action: getAll getServiciosSolicitadosClasificacion.controller][msg: ${e.message}][file:${__filename}]`,
				)
				throw Response.error(req, res, `Error interno en el servidor`, 400)
			}
		},
	}
}

module.exports = controller
