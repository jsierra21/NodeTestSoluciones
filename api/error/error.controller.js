const service = require('./../../services/error.mssql.service')
const Response = require('./../../utils/response')
const log4js = require('./../../utils/log4js')()
const email = require('./../../utils/email/email')
const Imagenes = require('./../../utils/fileSystem')
const { json } = require('body-parser')
const imagenes = new Imagenes()


module.exports = function () {
	return {
        postError: async (req, res) => {
			try {
               
                console.log(req.body);
				const result = await 	service.guardarError('FRONT','','',req.body.mensaje,'')
				
				return { msg: result.recordsets, status: 200 }
			} catch (e) {
				console.log(e.message)
				log4js.error(`[action: postCruce cruce.controller][msg: ${e.message}][file:${__filename}]`)
				service.guardarError('BACK','cruce.controller','postCruce',e.message,'')
				throw Response.error(req, res, 'Error interno en el servidor', 500)
			}
		},
		
		
		
	}
}