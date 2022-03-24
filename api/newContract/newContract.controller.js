const contratoService = require('./../../services/newContrato.mssql.service')
const Response = require('./../../utils/response')
const log4js = require('./../../utils/log4js')()
const email = require('./../../utils/email/email')

function newContract() {
	return {
		saveNewContrato: async (req, res) => {
			try {
				//console.log(req.body)
				//return { msg: 'Controlado', status: 400 }

				const { recordset } = await contratoService.saveNewContrato(req.body)
				return { msg: { recordset }, status: 200 }
			} catch (e) {
				log4js.error(`[action: saveNewContrato newContract.controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, `Error interno en el servidor`, 400)
			}
		},
		validateGroupServiceHasBeneficiario: async (req, res) => {
			try {
				const grupoId = req.params.groupId
				const { recordset } = await contratoService.validateGroupServiceHasBeneficiario(grupoId)
				const resp = await contratoService.getCargaInitial('contrato', grupoId)
				const object = {
					dataGral: recordset,
					cargaInitial: resp.recordsets,
				}
				return { msg: object, status: 200 }
			} catch (e) {
				log4js.error(
					`[action: validateGroupServiceHasBeneficiario newContract.controller][msg: ${e.message}][file:${__filename}]`
				)
				throw Response.error(req, res, `Error interno en el servidor`, 400)
			}
		},
		getListaContraros: async (req, res) => {
			try {
				const { recordset } = await contratoService.getAllListaContratos()
				return { msg: recordset, status: 200 }
			} catch (e) {
				log4js.error(`[action: getListaContraros newContract.controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, `Error interno en el servidor`, 400)
			}
		},
		updateEstado: async (req, res) => {
			try {
				const { recordset } = await contratoService.updateEstadoContrato(req.body)
				return { msg: recordset, status: 200 }
			} catch (e) {
				log4js.error(`[action: updateEstado newContract.controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, `Error interno en el servidor`, 400)
			}
		},
		updateEstadoDeBaja: async (req, res) => {
			try {
				const { recordset } = await contratoService.updateEstadoContratoDeBaja(req.body)
				return { msg: recordset, status: 200 }
			} catch (e) {
				log4js.error(`[action: updateEstado newContract.controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, `Error interno en el servidor`, 400)
			}
		},
		getInfoContrato: async (req, res) => {
			try {
				const { recordsets } = await contratoService.getInfoContrato(req.body)
				return { msg: recordsets, status: 200 }
			} catch (e) {
				log4js.error(`[action: getInfoContrato newContract.controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, `Error interno en el servidor`, 400)
			}
		},
		updateUser: async (req, res) => {
			try {
				const { recordset } = await contratoService.updateUser(req.body.usuario)
				email.sendmailEdicionContrato(req.body)
				return { msg: recordset, status: 200 }
			} catch (e) {
				log4js.error(`[action: updateUser newContract.controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, `Error interno en el servidor`, 400)
			}
		},
		updateContrato: async (req, res) => {
			try {
				const { recordset } = await contratoService.updateContrato(req.body.contrato)
				email.sendmailEdicionContrato(req.body)
				return { msg: recordset, status: 200 }
			} catch (e) {
				log4js.error(`[action: updateContrato newContract.controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, `Error interno en el servidor`, 400)
			}
		},
	}
}

module.exports = newContract
