'use strict'
/**
 * @name SaldoCtaContrato
 * @type function
 * @description Función encargada de realizar la consulta con Sequelize
 * @author Alfonso Navarro <alfonso.navarron@syspotec.com>
 */

const Query = require('./../db/queries')
const mensajes = require('./../utils/messages')
const log4js = require('./../utils/log4js')()

const getPbx = async () => {
	try {
		const query = `
      SELECT [idPbx]
        ,[time]
        ,[src]
        ,[queue]
        ,[agent]
        ,[event]
        ,[waittime]
        ,[duration]
        ,[ingoing]
        ,[outgoing]
        ,[overflow]
        ,[id]
        ,[nit]
      FROM [pbx].[registroPbx] (nolock)
    `

		return await Query.query(query)
	} catch (e) {
		log4js.error(`[action: getPbx pbx.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error('Server error interno')
	}
}

module.exports = {
	getPbx,
}
