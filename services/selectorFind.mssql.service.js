const Queries = require('./../db/queries')
const mensajes = require('./../utils/messages')
const log4js = require('./../utils/log4js')()

const selectorFind = async (params) => {
	let { option, data } = params
	data = data ? JSON.parse(data) : data
	return await Queries.querySP('[dbo].[spSelectorFind]', [{ option, ...data }])
}

module.exports = {
	selectorFind,
}
