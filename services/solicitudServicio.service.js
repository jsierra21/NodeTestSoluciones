const Query = require('./../db/queries')
const mensajes = require('./../utils/messages')
const log4js = require('./../utils/log4js')()

/**
 * Registramos una nueva solicutd de servicio
 * @param {*} data
 */
const newServiciosSolicitados = async (data) => {
	try {
		let { groupId, userId, servicioId, serviciosSolicitadosClasificacionId, observation, servicioAdquiridoId } = data

		if (serviciosSolicitadosClasificacionId === 'null') {
			serviciosSolicitadosClasificacionId = null
		}

		const userIdcreatedAt = userId
		const params = [
			{
				groupId,
				userId,
				servicioId,
				servicioAdquiridoId,
				observation,
				serviciosSolicitadosClasificacionId,
				userIdcreatedAt,
			},
		]

		// return await Query.queryInject(query, params)
		return await Query.querySP('[srv].[spNewServiciosSolicitados]', params)
	} catch (e) {
		log4js.error(`[action: newServiciosSolicitados services.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error('Server error interno')
	}
}

const updateServiciosSolicitadosSP = async (data) => {
	try {
		const { infoDocs } = data
		const jsonData = JSON.stringify(data)
		return await Query.querySP('[sol].spSolicitudServicioUpdate', [{ jsonData, infoDocs }])
	} catch (e) {
		log4js.error(
			`[action: updateServiciosSolicitados solicitudServicio.mssql.service][msg: ${e.message}][file:${__filename}]`
		)
		throw new Error('Server error interno')
	}
}

/**
 * Registramos una nueva solicutd de servicio
 * @param {*} data
 */
const serviciosSolicitadosDocumentos = async (data) => {
	try {
		const query = `
      INSERT INTO [dbo].[serviciosSolicitadosDocumentos]
           ([serviciosSolicitadosId]
           ,[documentsId]
           ,[serviceId]
           ,[documentsName]
           ,[documentsUrl]
           ,[documentsExt]
           ,[documentsSize]
           ,[estado]
           ,[userIdcreatedAt]
           ,[createdAt]
           )
     VALUES
           (@serviciosSolicitadosId
           ,@documentsId
           ,@serviceId
           ,@documentsName
           ,@documentspathWebRelative
           ,@documentsExt
           ,@documentsSize
           ,1
           ,@userIdcreatedAt
           ,GETDATE()
           )
		`
		const {
			userId,
			documentsId,
			serviceId,
			serviciosSolicitadosId,
			documentsName,
			documentspathWebRelative,
			documentsSize,
			documentsExt,
		} = data
		const userIdcreatedAt = userId
		return await Query.queryInject(query, [
			{
				serviciosSolicitadosId,
				documentsId,
				serviceId,
				userIdcreatedAt,
				documentsName,
				documentspathWebRelative,
				documentsSize,
				documentsExt,
			},
		])
	} catch (e) {
		log4js.error(
			`[action: serviciosSolicitadosDocumentos solicitudServicio.mssql.service][msg: ${e.message}][file:${__filename}]`
		)
		throw new Error('Server error interno')
	}
}

/**
 * Actualizamos el estado de la solicitud
 * @param {*} data = contiene variables actualizar
 * @param {*} estado = Indica el estado de la solicitud del servicio
 */
const updateStateServicioSolicitado = async (data, estado) => {
	try {
		const query = `
      UPDATE [dbo].[serviciosSolicitados]
        SET [estado]          = @estado
           ,[userIdcreatedAt] = @userIdcreatedAt
           ,[createdAt]       = GETDATE()
      WHERE [id] = @serviciosSolicitadosId
		`
		const { serviciosSolicitadosId } = data
		const userIdcreatedAt = data.userId
		return await Query.queryInject(query, [{ serviciosSolicitadosId, userIdcreatedAt, estado }])
	} catch (e) {
		log4js.error(
			`[action: serviciosSolicitadosDocumentos solicitudServicio.mssql.service][msg: ${e.message}][file:${__filename}]`
		)
		throw new Error('Server error interno')
	}
}

/**
 * Registramos una nueva solicutd de servicio
 * @param {*} data
 */
const validateActiveSolicitud = async (data) => {
	try {
		const query = `
      SELECT TOP (1) [id]
          ,[userId]
          ,[gruposId]
          ,[servicioId]
          ,[estado]
      FROM [dbo].[serviciosSolicitados]
      WHERE userId = @userId
      AND gruposId = @gruposId
      AND servicioId = @servicioId
      AND estado = 1
		`
		const { userId, gruposId, servicioId } = data
		return await Query.queryInject(query, [
			{
				userId,
				gruposId,
				servicioId,
			},
		])
	} catch (e) {
		log4js.error(
			`[action: validateActiveSolicitud solicitudServicio.mssql.service][msg: ${e.message}][file:${__filename}]`
		)
		throw new Error('Server error interno')
	}
}

const getConsultarServicioSolicitado = async (id) => {
	try {
		return await Query.querySP('[srv].[spGetConsultarServicioSolicitado]', [{ id }])
	} catch (e) {
		log4js.error(
			`[action: getConsultarServicioSolicitado services.mssql.service][msg: ${e.message}][file:${__filename}]`
		)
		throw new Error('Server error interno')
	}
}

const updateServicioSolicitadoDocumentos = async (data) => {
	try {
		const query = `
      UPDATE TOP(1) [dbo].[serviciosSolicitadosDocumentos]
      SET [documentsName]   = @documentsName
          ,[documentsUrl]   = @documentspathWebRelative
          ,[documentsExt]   = @documentsExt
          ,[documentsSize]  = @documentsSize
          ,[userIdupdateAt] = @userIdupdateAt
          ,[updateAt]       = GETDATE()
      WHERE 
          [id] = @serviciosSolicitadosDocumentosId
    `
		const {
			documentsName,
			documentspathWebRelative,
			documentsExt,
			documentsSize,
			userIdupdateAt,
			serviciosSolicitadosDocumentosId,
		} = data

		return await Query.queryInject(query, [
			{
				documentsName,
				documentspathWebRelative,
				documentsExt,
				documentsSize,
				userIdupdateAt,
				serviciosSolicitadosDocumentosId,
			},
		])
	} catch (e) {
		log4js.error(
			`[action: UpdateServicioSolicitado solicitudServicio.mssql.service][msg: ${e.message}][file:${__filename}]`
		)
		throw new Error('Server error interno')
	}
}

const getStateServiceUser = async (userId, grupoId) => {
	try {
		const query = `
      SELECT [estado]
			FROM [dbo].[servicioAdquirido]
			WHERE userId = @userId
  		AND [grupoId] = @grupoId
		`
		return await Query.queryInject(query, [{ userId, grupoId }])
	} catch (e) {
		log4js.error(
			`[action: getConsultarServicioSolicitado services.mssql.service][msg: ${e.message}][file:${__filename}]`
		)
		throw new Error('Server error interno')
	}
}

/**
 * Verificamos cantida de solicitudes realizadas a servicio juridico
 * @param {*} data
 */
const validateCountSolicitudServicioJuridico = async (data) => {
	try {
		const query = `
			SELECT 
				COUNT(*) cantidad
			FROM 
				[dbo].[serviciosSolicitados]
			WHERE 
				userId = @id
			AND 
				gruposId = @groupId
			AND 
				servicioId = @serviceId
			AND 
				(estado != 3 OR estado != 4)
		`
		const { id, groupId, serviceId } = data
		return await Query.queryInject(query, [
			{
				id,
				groupId,
				serviceId,
			},
		])
	} catch (e) {
		log4js.error(
			`[action: validateCountSolicitudServicioJuridico solicitudServicio.mssql.service][msg: ${e.message}][file:${__filename}]`
		)
		throw new Error('Server error interno')
	}
}

const searchSolicitudServicio = async (search, userId, groupId, servicioId) => {
	try {
		return await Query.querySP('search', [{ search, userId, groupId, servicioId, option: 'master' }])
	} catch (e) {
		log4js.error(`[action: searchSolicitudServicio entry.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error(mensajes('ERROR_INTERNO').description)
	}
}

const listaServiciosSolicitados = async (servicioId) => {
	try {
		return await Query.querySP('dbo.SpServicioSolicitados', [{ operacion: 'S', servicioId }])
	} catch (e) {
		log4js.error(`[action: listaServiciosSolicitados entry.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error(mensajes('ERROR_INTERNO').description)
	}
}

const listaServiciosSolicitadosFin = async (data) => {
	try {
		const params = {
			operacion: 'SF',
			fechaIni: data.dateDesde,
			fechaFin: data.dateHasta,
			servicioId: data.servicioId,
		}
		return await Query.querySP('dbo.SpServicioSolicitados', [params])
	} catch (e) {
		log4js.error(`[action: listaServiciosSolicitadosFin entry.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error(mensajes('ERROR_INTERNO').description)
	}
}

const OneServiciosSolicitados = async (data) => {
	try {
		return await Query.querySP('dbo.SpServicioSolicitados', [{ operacion: 'SD', id: data.id }])
	} catch (e) {
		log4js.error(`[action: OneServiciosSolicitados entry.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error(mensajes('ERROR_INTERNO').description)
	}
}

const guardarComentario = async (data) => {
	try {
		const params = {
			operacion: 'I',
			serviciosSolicitadosId: data.serviciosSolicitadosId,
			serviceId: data.serviceId,
			Comentario: data.Comentario,
			userIdcreatedAt: data.userIdcreatedAt,
		}
		return await Query.querySP('dbo.SpComentario', [params])
	} catch (e) {
		log4js.error(`[action: guardarComentario entry.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error(mensajes('ERROR_INTERNO').description)
	}
}

const finalizarServiciosSolicitados = async (data) => {
	try {
		const query = `
			UPDATE 
				dbo.serviciosSolicitados 
			set
				estado = 2
				,userIdupdateAt = @userIdupdateAt 
				,updateAt = GETDATE()
			where id = @id
		`
		return await Query.queryInject(query, [{ id: data.id, userIdupdateAt: data.userIdupdateAt }])
	} catch (e) {
		log4js.error(`[action: FinalizarServiciosSolicitados entry.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error(mensajes('ERROR_INTERNO').description)
	}
}

const deleteServicioSolicitado = async (id, body) => {
	try {
		const { userId, motivoDelete } = body
		const query = `
			UPDATE TOP(1) dbo.serviciosSolicitados 
			SET 
				estado = 3,
				motivoDelete = @motivoDelete,
				userIdupdateAt = @userId,
				updateAt = GETDATE()
			WHERE id = @id
		`
		return await Query.queryInject(query, [{ id, userId, motivoDelete }])
	} catch (e) {
		log4js.error(`[action: FinalizarServiciosSolicitados entry.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error(mensajes('ERROR_INTERNO').description)
	}
}

/**
 * Obtenemos listado de documentos guardado en base de datos a enviar por email
 * @param {*} serviciosSolicitadosId
 * @returns object
 */
const getFilesServicioSolicitado = async (serviciosSolicitadosId) => {
	try {
		return await Query.querySP('[doc].[spGetFilesServicioSolicitado]', [{ serviciosSolicitadosId }])
	} catch (e) {
		log4js.error(`[action: FinalizarServiciosSolicitados entry.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error(mensajes('ERROR_INTERNO').description)
	}
}

const deleteOtroDocumentFromDatabase = async (params) => {
	try {
		return await Query.querySP('[doc].[spDeleteOtroDocumentFromDatabase]', [params])
	} catch (e) {
		log4js.error(
			`[action: deleteOtroDocumentFromDatabase solicitudServicio.mssql.service][msg: ${e.message}][file:${__filename}]`
		)
		throw new Error(mensajes('ERROR_INTERNO').description)
	}
}

module.exports = {
	newServiciosSolicitados,
	serviciosSolicitadosDocumentos,
	validateActiveSolicitud,
	getConsultarServicioSolicitado,
	updateServicioSolicitadoDocumentos,
	updateServiciosSolicitadosSP,
	updateStateServicioSolicitado,
	getStateServiceUser,
	validateCountSolicitudServicioJuridico,
	searchSolicitudServicio,
	listaServiciosSolicitados,
	OneServiciosSolicitados,
	guardarComentario,
	finalizarServiciosSolicitados,
	listaServiciosSolicitadosFin,
	deleteServicioSolicitado,
	getFilesServicioSolicitado,
	deleteOtroDocumentFromDatabase,
}
