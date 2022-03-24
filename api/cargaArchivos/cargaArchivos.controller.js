'use strict'
const service = require('./../../services/cargaArchivos.mssql.service')
const LogBD = require('./../../utils/logsBD')
const logBD = new LogBD()

const Response = require('./../../utils/response')
const log4js = require('./../../utils/log4js')()

module.exports = function () {
	return {
		parametros: async (req, res) => {
			try {
				const parametrosanio = await service.parametrosAnio()
				const parametrosmonth = await service.parametrosmonth()
				const obj = {
					parametrosanio,
					parametrosmonth,
				}
				return { msg: obj, status: 200 }
			} catch (e) {
				const msg = `[action: logs getById][msg: ${e.message}][file:${__filename}]`
				logBD.saveLogs(msg)
				log4js.error(msg)
				throw Response.error(req, res, 'Internal Error Server', 500)
			}
		},
		getListDescuentoNomina: async (req, res) => {
			try {
				const result = await service.getListDescuentoNomina()
				return { msg: result, status: 200 }
			} catch (e) {
				const msg = `[action: logs getById][msg: ${e.message}][file:${__filename}]`
				logBD.saveLogs(msg)
				log4js.error(msg)
				throw Response.error(req, res, 'Internal Error Server', 400)
			}
		},
		descuentoNomina: async (req, res) => {
			try {
				const result = await service.descuentoNomina(req)
				return { msg: result, status: 200 }
			} catch (e) {
				const msg = `[action: descuentoNomina cargaArchivos.controller][msg: ${e.message}][file:${__filename}]`
				logBD.saveLogs(msg)
				log4js.error(msg)
				throw Response.error(req, res, 'Internal Error Server', 400)
			}
		},
		deleteDescuentoNomina: async (req, res) => {
			try {
				const result = await service.deleteDescuentoNomina(req.body)
				return { msg: result, status: 200 }
			} catch (e) {
				const msg = `[action: deleteLoadFileAfiliados cargaArchivos.controller][msg: ${e.message}][file:${__filename}]`
				logBD.saveLogs(msg)
				log4js.error(msg)
				throw Response.error(req, res, 'Internal Error Server', 400)
			}
		},
		deleteLoadFileNewAfiliados: async (req, res) => {
			try {
				const result = await service.deleteLoadFileNewAfiliados(req.body)
				return { msg: result, status: 200 }
			} catch (e) {
				const msg = `[action: deleteLoadFileNewAfiliados cargaArchivos.controller][msg: ${e.message}][file:${__filename}]`
				logBD.saveLogs(msg)
				log4js.error(msg)
				throw Response.error(req, res, 'Internal Error Server', 400)
			}
		},
		deleteLoadFileBajaAfiliados: async (req, res) => {
			try {
				const result = await service.deleteLoadFileBajaAfiliados(req.body)
				return { msg: result, status: 200 }
			} catch (e) {
				const msg = `[action: deleteLoadFileBajaAfiliados argaArchivos.controller][msg: ${e.message}][file:${__filename}]`
				logBD.saveLogs(msg)
				log4js.error(msg)
				throw Response.error(req, res, 'Internal Error Server', 400)
			}
		},
		validateExistCargaArchivos: async (req, res) => {
			try {
				const result = await service.validateExistCargaArchivos(req.query)
				return { msg: result, status: 200 }
			} catch (e) {
				const msg = `[action: validateExistCargaArchivos cargaArchivos.controller][msg: ${e.message}][file:${__filename}]`
				logBD.saveLogs(msg)
				log4js.error(msg)
				throw Response.error(req, res, 'Internal Error Server', 400)
			}
		},
		nuevosAfialidos: async (req, res) => {
			try {
				const result = await service.nuevosAfialidos(req)
				return { msg: result, status: 200 }
			} catch (e) {
				const msg = `[action: nuevosAfialidos cargaArchivos.controller][msg: ${e.message}][file:${__filename}]`
				logBD.saveLogs(msg)
				log4js.error(msg)
				throw Response.error(req, res, 'Internal Error Server', 400)
			}
		},
		bajaAfiliados: async (req, res) => {
			try {
				const result = await service.bajaAfiliados(req)
				return { msg: result, status: 200 }
			} catch (e) {
				const msg = `[action: bajaAfiliados cargaArchivos.controller][msg: ${e.message}][file:${__filename}]`
				logBD.saveLogs(msg)
				log4js.error(msg)
				throw Response.error(req, res, 'Internal Error Server', 400)
			}
		},
		getListnuevosAfialidos: async (req, res) => {
			try {
				const result = await service.getListNuevosAfialidos()
				return { msg: result, status: 200 }
			} catch (e) {
				const msg = `[action: getListnuevosAfialidos cargarArchivos.controller][msg: ${e.message}][file:${__filename}]`
				logBD.saveLogs(msg)
				log4js.error(msg)
				throw Response.error(req, res, 'Internal Error Server', 400)
			}
		},
		getListBajaAfialidos: async (req, res) => {
			try {
				const result = await service.getListBajaAfialidos(req)
				return { msg: result, status: 200 }
			} catch (e) {
				const msg = `[action: bajaAfiliados cargaArchivos.controller][msg: ${e.message}][file:${__filename}]`
				logBD.saveLogs(msg)
				log4js.error(msg)
				throw Response.error(req, res, 'Internal Error Server', 400)
			}
		},
		getListBajaAfiliados: async (req, res) => {
			try {
				const result = await service.getListbajaAfiliados()
				return { msg: result, status: 200 }
			} catch (e) {
				const msg = `[action: getListbajaAfiliados cargarArchivos.controller][msg: ${e.message}][file:${__filename}]`
				logBD.saveLogs(msg)
				log4js.error(msg)
				throw Response.error(req, res, 'Internal Error Server', 400)
			}
		},
	}
}
