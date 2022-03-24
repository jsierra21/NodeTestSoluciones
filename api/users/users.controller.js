// const seq = require('../../services/users')
// const DB = require('../../db/db')
// const db = new DB('users')
const bcrypt = require('bcrypt')
const mail = require('./../../utils/email/email')

const service = require('./../../services/user.mssql.service')

const Response = require('./../../utils/response')
const log4js = require('./../../utils/log4js')()

module.exports = function () {
	return {
		getByIdmb: async (req, res) => {
			try {
				const {
					params: { id },
				} = req
				const result = await service.countOne(id)
				if (result === null) {
					throw Response.error(req, res, 'No se encontraron registros de usuarios', 400)
				} else {
					return result
				}
			} catch (e) {
				log4js.error(`[action: stickerOpciones updateAdminMsSql controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, 'Server error interno', 500)
			}
		},
		createmb: async (req, res) => {
			try {
				const data = req.body
				data.usrPassword = bcrypt.hashSync(data.usrPassword, 10)
				await service.create(data)
				delete data['usrPassword']
				return { msg: data.recordset, status: 200 }
			} catch (e) {
				log4js.error(`[action: createmb controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, 'Server error interno', 500)
			}
		},
		mailmb: async (req, res) => {
			try {
				// const resp = await service.FindOne(req.body)
				// if (parseInt(resp[0].cantidad, 10) !== 0) {
				// 	return { msg: 'Este usuario ya se encuentra registrado', status: 400 }
				// }
				// const { recordset } = await service.FindOneValidateEmail(req.body)
				// if (recordset[0].cantidad === 1) {
				// 	return { msg: 'Este email ya se encuentra registrado', status: 400 }
				// }

				const { recordset } = await service.sPFindUserMail(req.body)

				const { mensaje, Estado, Existe } = recordset[0]
				if (Existe) {
					return { msg: mensaje, status: Estado }
				}

				const codVerificacion = await mail.sendEmail(req.body)
				return { msg: codVerificacion, status: 200 }
			} catch (e) {
				log4js.error(`[action: userController mailmb ][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, 'Error interno en el servidor', 400)
			}
		},
		putUsermb: async (req, res) => {
			try {
				const {
					params: { id },
				} = req
				const user = await service.countOne(id)
				if (!user) {
					return { msg: 'No se encontró ningún registro con ese ID', status: 400 }
				} else {
					await service.update(id, req.body)
					return { msg: 'Datos actualizados correctamente.', status: 200 }
				}
			} catch (e) {
				log4js.error(`[action: stickerOpciones updateUser controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, 'Server error interno', 400)
			}
		},
		updatePassUsermb: async (req, res) => {
			try {
				const {
					params: { id },
				} = req
				const user = await service.countOne(id)
				if (!user) {
					return { msg: 'No se encontró ningún registro con ese ID', status: 400 }
				} else {
					let newPassword = bcrypt.hashSync(req.body.usrPassword, 10)
					await service.updatePass(id, newPassword)
					return { msg: 'Datos actualizados correctamente.', status: 200 }
				}
			} catch (e) {
				log4js.error(`[action: stickerOpciones updatePass controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, 'Server error interno', 400)
			}
		},
	}
}
