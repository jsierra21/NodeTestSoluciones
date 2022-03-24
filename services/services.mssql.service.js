const Query = require('./../db/queries')
const mensajes = require('./../utils/messages')
const log4js = require('./../utils/log4js')()

const getAll = async () => {
	try {
		const query = `
      SELECT 
        g.id, g.title, g.description
      FROM [dbo].[grupos] g (nolock)
      WHERE g.estado = 1
    `

		return await Query.query(query)
	} catch (e) {
		log4js.error(`[action: getAll services.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error('Server error interno')
	}
}

const getFilterService = async (userTypeId, idUser) => {
	try {
		return await Query.querySP('[srv].[spGetFilterService]', [{ userTypeId, idUser }])
	} catch (e) {
		log4js.error(`[action: getFilterService services.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error('Server error interno')
	}
}

/**
 * Obtenemos lista de servicios adquiridos
 * @param {*} data objeto con las variables a enviar
 * @returns objeto con la respuesta
 */
const getListAdquiridos = async (data) => {
	try {
		const { groupId, userId } = data
		return await Query.querySP('[srv].[spListAdquiridos]', [{ userId, groupId }])
	} catch (e) {
		log4js.error(`[action: getAll services.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error('Server error interno')
	}
}

const getListSolicitados = async (data) => {
	try {
		const { groupId, userId, servicioId } = data
		return await Query.querySP('[srv].[spGetListServicesSolicitados]', [{ groupId, userId, servicioId }])
	} catch (e) {
		log4js.error(`[action: getAll services.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error('Server error interno')
	}
}

/**
 * Obtenemos listaod de documentos solicitar de acuerdo al servicio solicitado
 * @param {*} servicioId id del servicio
 * @returns array de datos
 */
const getListDocument = async (servicioId) => {
	try {
		return await Query.querySP('[doc].[spGetListDocument]', [{ servicioId }])
	} catch (e) {
		log4js.error(`[action: getAll services.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error('Server error interno')
	}
}

/**
 * Validamos si la persona esta afiliado a un grupo de servicio
 * @param {*} data
 */
const validateGrupoServicio = async (data) => {
	try {
		const query = `
      SELECT TOP(1) COUNT(*) afiliado
			FROM [dbo].[servicioAdquirido] sa (nolock)
			WHERE sa.userId = @userId
			AND sa.grupoId = @groupId
    `
		const { groupId, userId } = data
		return await Query.queryInject(query, [{ groupId, userId }])
	} catch (e) {
		log4js.error(`[action: getAll services.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error('Server error interno')
	}
}

module.exports = {
	getAll,
	getFilterService,
	getListAdquiridos,
	getListSolicitados,
	getListDocument,
	validateGrupoServicio,
}
