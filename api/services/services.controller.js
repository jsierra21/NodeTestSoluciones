const service = require('./../../services/services.mssql.service')
const Response = require('./../../utils/response')
const log4js = require('./../../utils/log4js')()

const servicios = () => {
	return {
		getAll: async (req, res) => {
			try {
				const { recordset } = await service.getAll()
				return { msg: recordset, status: 200 }
			} catch (e) {
				log4js.error(`[action: getAll services.controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, `Error interno en el servidor`, 400)
			}
		},
		getFilterService: async (req, res) => {
			try {
				const { userTypeId } = req.params
				const { idUser } = req.query
				const { recordsets } = await service.getFilterService(userTypeId, idUser)
				return { msg: recordsets, status: 200 }
			} catch (e) {
				log4js.error(`[action: getFilterService services.controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, `Error interno en el servidor`, 400)
			}
		},
		getListAdquiridos: async (req, res) => {
			try {
				const { userId } = req.params
				const { groupId } = req.query
				const data = {
					userId,
					groupId,
				}

				const { recordset } = await service.getListAdquiridos(data)

				return { msg: recordset, status: 200 }
			} catch (e) {
				log4js.error(`[action: getListAdquiridos services.controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, `Error interno en el servidor`, 400)
			}
		},
		getListSolicitados: async (req, res) => {
			try {
				const { id } = req.params
				const { groupId, servicioId } = req.query
				const data = {
					userId: id,
					groupId,
					servicioId,
				}
				const { recordset } = await service.getListSolicitados(data)
				return { msg: recordset, status: 200 }
			} catch (e) {
				log4js.error(`[action: getListSolicitados services.controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, `Error interno en el servidor`, 400)
			}
		},
		getListDocument: async (req, res) => {
			try {
				const { id } = req.params
				const { recordset } = await service.getListDocument(id)
				return { msg: recordset, status: 200 }
			} catch (e) {
				log4js.error(`[action: getListDocument services.controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, `Error interno en el servidor`, 400)
			}
		},
		validateGrupoServicio: async (req, res) => {
			try {
				const { id } = req.params
				const { groupId } = req.query
				const data = {
					userId: id,
					groupId,
				}
				const { recordset } = await service.validateGrupoServicio(data)
				return { msg: recordset[0].afiliado, status: 200 }
			} catch (e) {
				log4js.error(`[action: validateGrupoServicio services.controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, `Error interno en el servidor`, 400)
			}
		},
	}
}

module.exports = servicios
