const Query = require('./../db/queries')
const mensajes = require('./../utils/messages/message')
const log4js = require('./../utils/log4js')()

const getAll = async () => {
	try {
		const query = `
      SELECT [id]
        ,[title]
        ,[mensaje]
        ,[imageUrl]
      FROM [dbo].[sliders] (nolock)
      WHERE state = 1    
    `
		return await Query.queryInject(query, [])
	} catch (e) {
		log4js.error(`[action: getAll slider.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

const getAllSliderSP = async () => {
	try {
		return await Query.querySP('getSliders', [])
	} catch (e) {
		log4js.error(`[action: getAll slider.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

module.exports = {
	getAll,
	getAllSliderSP,
}
