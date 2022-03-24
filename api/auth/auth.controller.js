const bcrypt = require('bcrypt')
// mssql
const authMobile = require('./../../services/auth.mssql.service')
const Response = require('./../../utils/response')
const log4js = require('./../../utils/log4js')()
const Queries = require('./../../db/queries')

const jwt = require('./../middlewares/jwt')
const email = require('../../utils/email/email')

module.exports = function () {
	return {
		authAdminMsSql: async (req, res) => {
			try {
				const data = req.body
				const ip = req.ip

				const { usrEmail, usrPassword } = data
				const user = await authMobile.findOneAdmin(usrEmail)
				if (parseInt(user.rowsAffected, 10) === 0) {
					return { msg: 'Datos de acceso incorrectos', status: 400 }
				} else {
					if (!user) {
						return { msg: 'Datos de acceso incorrectos.', status: 400 }
					} else {
						const validatePassword = bcrypt.compareSync(usrPassword, user.recordset[0].usrPassword)
						if (!validatePassword) {
							return { msg: 'Datos de acceso incorrectos_', status: 400 }
						} else {
							await Queries.lastLogin(user.recordset[0].id, ip)
							const token = jwt.create(user.recordset[0])
							res.setHeader('Authorization', `Bearer ${token}`)

							// Aqui obtenemos el menu
							const options = await Queries.menus(user.recordset[0].profileId)
							const menus = options.recordset.filter((o) => !o.menuId)

							menus.map((m) => {
								m.menus = options.recordset.filter((o) => m.id === o.menuId)
							})
							const buffer = Buffer.from(JSON.stringify(menus), 'utf8')
							user.recordset[0].access = buffer.toString('base64')

							delete user.recordset[0].usrPassword
							return { msg: user.recordset[0], status: 200 }
						}
					}
				}
			} catch (e) {
				console.log(e)
				log4js.error(`[action: authAdminMsSql][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, 'Error interno en el servidor', 500)
			}
		},
		authMobileMsSql: async (req, res) => {
			try {
				const data = req.body
				const ip = req.ip

				const { usrEmail, usrPassword } = data
				const user = await authMobile.findOne(usrEmail)
				if (parseInt(user.rowsAffected, 10) === 0) {
					return { msg: 'Datos de acceso incorrectos', status: 400 }
				} else {
					if (!user) {
						return { msg: 'Datos de acceso incorrectos.', status: 400 }
					} else {
						const validatePassword = bcrypt.compareSync(usrPassword, user.recordset[0].usrPassword)
						if (!validatePassword) {
							return { msg: 'Datos de acceso incorrectos_', status: 400 }
						} else {
							delete user.recordset[0].usrPassword
							const token = jwt.create(user.recordset[0])
							if (token) {
								res.setHeader('Authorization', `Bearer ${token}`)
							}
							await authMobile.update(user.recordset[0].id)
							return { msg: user.recordset[0], status: 200 }
						}
					}
				}
			} catch (e) {
				log4js.error(`[action: authMobileMsSql][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, `Error interno en el servidor`, 400)
			}
		},
		recoverypassmb: async (req, res) => {
			try {
				const { emailRecovery } = req.body
				const { recordset } = await authMobile.findOne(emailRecovery)
				if (recordset.length === 0) {
					return { msg: 'Correo no registrado!!!', status: 404 }
				} else {
					const resp = await email.recoverypass(recordset[0])
					return { msg: resp, status: 200 }
				}
			} catch (e) {
				log4js.error(`[action: recoverypassmb][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, 'Error interno en el servidor', 400)
			}
		},
	}
}
