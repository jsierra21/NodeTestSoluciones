const Queries = require('./../db/queries')
const log4js = require('./../utils/log4js')()
const FileSystem = require('./../utils/fileSystem')
const fileSystem = new FileSystem()
const mensajes = require('./../utils/messages/message')
const LogBD = require('./../utils/logsBD')
const logBD = new LogBD()

const parametrosAnio = async () => {
	try {
		const query = `
            SELECT [id]
                  ,[anio]
                  ,[estado]
                  ,[userIdcreatedAt]
                  ,[createdAt]
                  ,[userIdupdatedAt]
                  ,[updatedAt]
            FROM [pay].[periodoYear] (nolock)
            WHERE estado = 1 and anio<=YEAR(GETDATE())
      `
		const { recordset } = await Queries.query(query)
		return recordset
	} catch (e) {
		logBD.saveLogs(JSON.stringify(e))
		log4js.error(`[action: parametrosAnio cargaArchivos.mssql.service][msg: ${JSON.stringify(e)}][file:${__filename}]`)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

const parametrosmonth = async () => {
	try {
		const query = `
      SELECT [id]
            ,[month] mes
            ,[estado]
            ,[userIdcreatedAt]
            ,[createdAt]
            ,[userIdupdatedAt]
            ,[updatedAt]
      FROM [pay].[periodoMonth] (nolock)
			WHERE estado = 1
      ORDER BY id
    `
		const { recordset } = await Queries.query(query)
		return recordset
	} catch (e) {
		logBD.saveLogs(JSON.stringify(JSON.stringify(e)))
		log4js.error(`[action: parametrosmonth cargaArchivos.mssql.service][msg: ${JSON.stringify(e)}][file:${__filename}]`)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

const descuentoNomina = async (req) => {
	try {
		const { userId, idMonth, idYear, typeFileId, aplicar, datos } = req.body
		const { file1 } = req.files

		const objImg = await fileSystem.guardarImagenTemporal(file1, 1, userId, 'CargaFilePay')

		const params = {
			typeFileId: typeFileId,
			idMonth: idMonth,
			idYear: idYear,
			userId: userId,
			estado: 1,
			fileUrl: objImg.ruta,
			filePathBD: objImg.pathBD,
			fileNameOriginal: file1.name,
			fileName: objImg.nombreArchivo,
			fileExt: file1.mimetype,
			fileSize: file1.size,
			fileUrlAbsolute: objImg.pathUserFinal,
			AplicarContrado: aplicar,
			json: datos,
		}
		const { recordset } = await Queries.querySP('dbo.SpDescuentoNomina', [params])
		return recordset
	} catch (e) {
		const msg = `[action: descuentoNomina cargaArchivos.mssql.service][msg:${e.message}]`
		logBD.saveLogs(msg)
		log4js.error(msg)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

const nuevosAfialidos = async (req) => {
	try {
		const { userId, idMonth, idYear, typeFileId, datos } = req.body
		const { file1 } = req.files

		const objImg = await fileSystem.guardarImagenTemporal(file1, 1, userId, 'CargaFilePay')

		const params = {
			typeFileId: typeFileId,
			idMonth: idMonth,
			idYear: idYear,
			userId: userId,
			estado: 1,
			fileUrl: objImg.ruta,
			filePathBD: objImg.pathBD,
			fileNameOriginal: file1.name,
			fileName: objImg.nombreArchivo,
			fileExt: file1.mimetype,
			fileSize: file1.size,
			fileUrlAbsolute: objImg.pathUserFinal,
			json: datos,
		}
		const { recordset } = await Queries.querySP('dbo.SpNuevosAfiliados', [params])
		return recordset
	} catch (e) {
		const msg = `[action: nuevosAfialidos cargaArchivos.mssql.service][msg:${e.message}]`
		logBD.saveLogs(msg)
		log4js.error(msg)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

const bajaAfiliados = async (req) => {
	try {
		const { userId, idMonth, idYear, typeFileId, datos } = req.body
		const { file1 } = req.files

		const objImg = await fileSystem.guardarImagenTemporal(file1, 1, userId, 'CargaFilePay')

		const params = {
			typeFileId: typeFileId,
			idMonth: idMonth,
			idYear: idYear,
			userId: userId,
			estado: 1,
			fileUrl: objImg.ruta,
			filePathBD: objImg.pathBD,
			fileNameOriginal: file1.name,
			fileName: objImg.nombreArchivo,
			fileExt: file1.mimetype,
			fileSize: file1.size,
			fileUrlAbsolute: objImg.pathUserFinal,
			json: datos,
		}
		const { recordset } = await Queries.querySP('dbo.SpBajaAfiliado', [params])
		return recordset
	} catch (e) {
		const msg = `[action: bajaAfiliados cargaArchivos.mssql.service][msg:${e.message}]`
		logBD.saveLogs(msg)
		log4js.error(msg)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

const callLoadFileToBD_SP = async (nameSp, parameters) => {
	try {
		return await Queries.querySP(nameSp, parameters)
	} catch (e) {
		logBD.saveLogs(JSON.stringify(e))
		log4js.error(
			`[action: callLoadFileToBD_SP cargaArchivos.mssql.service][msg: ${JSON.stringify(e)}][file:${__filename}]`
		)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

const getListDescuentoNomina = async () => {
	try {
		const { recordset } = await Queries.querySP('[dash].[getListDescuentoNomina]', [])
		return recordset
	} catch (e) {
		logBD.saveLogs(JSON.stringify(e))
		log4js.error(
			`[action: getListCargaArchivos cargaArchivos.mssql.service][msg: ${JSON.stringify(e)}][file:${__filename}]`
		)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

const getListNuevosAfialidos = async () => {
	try {
		const { recordset } = await Queries.querySP('[dash].[spGetListNuevosAfialidos]', [])
		return recordset
	} catch (e) {
		logBD.saveLogs(JSON.stringify(e))
		log4js.error(
			`[action: getListCargaArchivos cargaArchivos.mssql.service][msg: ${JSON.stringify(e)}][file:${__filename}]`
		)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

const getListBajaAfialidos = async () => {
	try {
		const { recordset } = await Queries.querySP('[dash].[spGetListBajaAfialidos]', [])
		return recordset
	} catch (e) {
		logBD.saveLogs(JSON.stringify(e))
		log4js.error(
			`[action: getListCargaArchivos cargaArchivos.mssql.service][msg: ${JSON.stringify(e)}][file:${__filename}]`
		)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

const deleteDescuentoNomina = async (data) => {
	try {
		const { id, userId, observationDelete } = data
		const { recordset } = await Queries.querySP('deleteLoadFileDescuentoNomina', [
			{ action: 'delete', idCargaArchivo: id, userId, observationDelete },
		])
		return recordset
	} catch (e) {
		logBD.saveLogs(JSON.stringify(e))
		log4js.error(
			`[action: deleteCargaArchivos cargaArchivos.mssql.service][msg: ${JSON.stringify(e)}][file:${__filename}]`
		)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

const deleteLoadFileNewAfiliados = async (data) => {
	try {
		const { id, userId, observationDelete } = data
		const { recordset } = await Queries.querySP('deleteLoadFileNewAfiliados', [
			{ action: 'delete', idCargaArchivo: id, userId, observationDelete },
		])
		return recordset
	} catch (e) {
		logBD.saveLogs(JSON.stringify(e))
		log4js.error(
			`[action: deleteCargaArchivos cargaArchivos.mssql.service][msg: ${JSON.stringify(e)}][file:${__filename}]`
		)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

const deleteLoadFileBajaAfiliados = async (data) => {
	try {
		const { id, userId, observationDelete } = data
		const { recordset } = await Queries.querySP('deleteLoadFileBajaAfiliados', [
			{ action: 'delete', idCargaArchivo: id, userId, observationDelete },
		])
		return recordset
	} catch (e) {
		logBD.saveLogs(JSON.stringify(e))
		log4js.error(
			`[action: deleteLoadFileBajaAfiliados cargaArchivos.mssql.service][msg: ${JSON.stringify(e)}][file:${__filename}]`
		)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

const validateExistCargaArchivos = async (data) => {
	try {
		const query = `
			SELECT 
				COUNT(*) cantidad, ca.id, y.anio , m.month, m.createdAt
			FROM 
				[pay].[CargaArchivo] ca (nolock)
			INNER JOIN 
				[pay].[periodoYear] y ON ca.idYear = y.id
			INNER JOIN 
				[pay].[periodoMonth] m ON ca.idMonth = m.id
			WHERE 
				[idYear]  = @idYear
			AND 
				[idMonth] = @idMonth
			AND
				ca.[estado] IN(1)
			GROUP BY 
				ca.id, y.anio, m.month, m.createdAt
		`
		const { idYear, idMonth } = data
		const { recordset } = await Queries.queryInject(query, [{ idYear, idMonth }])
		return recordset
	} catch (e) {
		console.log(e)
		logBD.saveLogs(JSON.stringify(e))
		log4js.error(
			`[action: validateExistCargaArchivos cargaArchivos.mssql.service][msg: ${JSON.stringify(e)}][file:${__filename}]`
		)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

module.exports = {
	parametrosAnio,
	parametrosmonth,
	descuentoNomina,
	nuevosAfialidos,
	bajaAfiliados,
	getListDescuentoNomina,
	getListNuevosAfialidos,
	getListBajaAfialidos,
	deleteDescuentoNomina,
	deleteLoadFileNewAfiliados,
	deleteLoadFileBajaAfiliados,
	validateExistCargaArchivos,
}
