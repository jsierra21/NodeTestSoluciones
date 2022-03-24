const Query = require('./../db/queries')
const mensajes = require('./../utils/messages/message')
const log4js = require('./../utils/log4js')()
const GuardarImagen = require('./../utils/base64ToImg')
const convertToImg = new GuardarImagen()
const contratoPDF = require('./../utils/html5ToPdf/index')
const moment = require('moment')
const serviceUser = require('./user.mssql.service')
const serviceparRtateLegal = require('./parRtateLegal.service')
const mail = require('./../utils/email/email')

let dataContratoPdf = {}
let dataUser
let groupNameService = ''
const concepto = 'firmas'
let path, nombreArchivo, firmaFinal, contratoUrl

const saveNewContrato = async (data) => {
	try {
		//#region OBTENEMOS VARIBLES PARA SU GUARDADO
		const {
			userId,
			groupId,
			tyc,
			beneficiario,
			beneficiarioJuridico,
			pin,
			payNomina,
			groupName,
			fnacimiento,
			estadoCivil,
			ciudad,
			direccion,
			referido,
			sign,
			userData,
		} = data

		const userdataParse = JSON.parse(userData)
		const { userTypesId } = userdataParse

		groupNameService = groupName

		nombreArchivo = convertToImg.generarNombreUnico()
		path = convertToImg.crearCarpetaUsuario(userId, concepto)

		dataContratoPdf = {
			...path,
			nombreArchivo: `${nombreArchivo}.jpg`,
			rutaRelativaImagen: `${path.pathBD}/${nombreArchivo}.jpg`,
			rutaRelativaPdf: `${path.pathBD}/${nombreArchivo}.pdf`,
			firma: false,
		}
		//#endregion

		//#region GUARDAMOS FIRMA
		if (![null, undefined].includes(sign) && sign.length !== 0) {
			firmaFinal = await convertToImg.saveFile(sign, path, nombreArchivo, data)
			dataContratoPdf.firma = true
		}

		const urlFirmaFinal = [null, undefined].includes(firmaFinal) ? null : dataContratoPdf.rutaRelativaImagen
		const contratoUrl = dataContratoPdf.rutaRelativaPdf

		const beneficiariosTmp = JSON.stringify(beneficiario)
		const beneficiariosJuridicoTmp = JSON.stringify(beneficiarioJuridico)
		const { recordset } = await Query.querySP('[srv].[spCrearContrato]', [
			{
				userId,
				groupId,
				urlFirmaFinal,
				contratoUrl,
				tyc,
				pin,
				payNomina,
				beneficiariosTmp,
				fnacimiento,
				estadoCivil,
				ciudad,
				direccion,
				referido,
			},
		])
		//#endregion

		const { servicioAdquiridoId, nroContrato } = recordset[0]
		const userDataObject = userDataFunction(servicioAdquiridoId, userId, userId, userTypesId, groupId)

		/** GUARDAMOS BENEFICIARIOS */
		if (beneficiario.length !== 0) {
			saveBeneficiarios(beneficiario, userDataObject)
		}

		if (beneficiarioJuridico.length !== 0) {
			saveBeneficiarios(beneficiarioJuridico, userDataObject)
		}
		//#endregion

		//#region CREAMOS CONTRATO
		createContratoPdf(data, userDataObject, nroContrato)
		//#endregion

		return true
	} catch (e) {
		log4js.error(`[action: saveNewContrato newContract.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

/**
 * Creamos objeto
 * @param {*} servicioAdquiridoId
 * @param {*} userId
 * @param {*} servicioId
 * @param {*} userId
 * @param {*} userTypesId
 * @returns
 */
function userDataFunction(servicioAdquiridoId, userId, userId, userTypesId, groupId) {
	return {
		servicioAdquiridoId,
		userId,
		userIdcreatedAt: userId,
		userTypesId,
		groupId,
	}
}

/**
 * Metodo para consultar los Sliders
 * @returns array
 */
const getAllSliderSP = async () => {
	try {
		return await Query.querySP([])
	} catch (e) {
		log4js.error(`[action: getAll slider.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

const updateFirmaFinal = async (data) => {
	try {
		const query = `
			UPDATE [dbo].[servicioAdquirido]
			SET 
				 [urlFirmaFinal] = @urlFirmaFinal
				,[contratoUrl] = @urlPdfFinal
			WHERE id = @id
		`
		const { urlFirmaFinal, urlPdfFinal, id } = data
		return await Query.queryInject(query, [{ urlFirmaFinal, urlPdfFinal, id }])
	} catch (e) {
		log4js.error(`[action: getAll slider.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

async function saveBeneficiarios(data, userData) {
	try {
		const { servicioAdquiridoId, userIdcreatedAt } = userData
		Promise.all(
			data.map((beneficiario) => {
				const query = `
					INSERT INTO [dbo].[servicioAdquiridoBeneficiarios]
							([parentesco]
							,[completeName]
							,[edad]
							,[servicioAdquiridoId]
							,[servicioId]
							,[userIdcreatedAt]
							,[createdAt]
							)
					VALUES
							(@parentesco
							,@nombreCompleto
							,@edad
							,@servicioAdquiridoId
							,@servicioId
							,@userIdcreatedAt
							,GETDATE()
							)
				`
				const { parentesco, nombreCompleto, edad, servicioId } = beneficiario

				Query.queryInject(query, [
					{ parentesco, nombreCompleto, edad, servicioAdquiridoId, servicioId, userIdcreatedAt },
				])
			})
		)

		return true
	} catch (e) {
		log4js.error(`[action: getAll slider.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

/**
 * Metodo para crear contrato una vez guardado registro en base de datos
 * @param {*} data => Objeto con los datos necesarios para generar el contrato
 * @param {*} userData => Usuarios de
 * @returns
 */
async function createContratoPdf(data, userDataObject, nroContrato) {
	try {
		const { userTypesId } = userDataObject
		const { userId } = data

		const resp = await serviceUser.FindOneUser(userId)
		dataUser = resp[0]

		const respRLegal = await serviceparRtateLegal.getParRtateLegal()
		let respRtateLegal = respRLegal[0]

		const objectContratoPdf = await contratoPDF.run({
			day: moment().format('DD'),
			month: monthName(moment().month()),
			year: moment().year(),
			...data,
			...dataUser,
			dataContratoPdf,
			...respRtateLegal,
			nroContrato,
			userTypesId,
		})

		await sendContratoByMail(objectContratoPdf)
		return objectContratoPdf
	} catch (e) {
		console.log(e)
		log4js.error(`[action: createContratoPdf newContrato.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

async function sendContratoByMail(objectContratoPdf) {
	try {
		await mail.sendEmailContrato(dataUser, objectContratoPdf, groupNameService)
		console.log(`Correo enviado!!!`)
	} catch (error) {
		log4js.error(`[action: sendContratoByMail newContrato.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

/**
 * Consultamos si el Plan hay q solicitarle beneficiarios
 * @param {*} grupoId id del plan a obtener
 * @returns
 */
async function validateGroupServiceHasBeneficiario(grupoId) {
	try {
		return await Query.querySP('[srv].[spValidateHasBeneficiario]', [{ grupoId }])
	} catch (e) {
		log4js.error(
			`[action: validateGroupServiceHasBeneficiario newContrato.mssql.service][msg: ${e.message}][file:${__filename}]`
		)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

function monthName(m) {
	const month = new Array()
	month[0] = 'Enero'
	month[1] = 'Febrero'
	month[2] = 'Marzo'
	month[3] = 'Abril'
	month[4] = 'Mayo'
	month[5] = 'Junio'
	month[6] = 'Julio'
	month[7] = 'Augosto'
	month[8] = 'Septiembre'
	month[9] = 'Octubre'
	month[10] = 'Noviembre'
	month[11] = 'Diciembre'

	return month[m]
}

const getAllListaContratos = async () => {
	try {
		return await Query.querySP('[srv].[spListContratos]', [])
	} catch (e) {
		log4js.error(`[action: getAll newContrato.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

const updateEstadoContrato = async (data) => {
	try {
		const query = `
			UPDATE dbo.servicioAdquirido 
				SET estado = @estado
			WHERE id = @id
		`

		const params = {
			estado: data.estado,
			id: data.id,
		}
		return await Query.queryInject(query, [params])
	} catch (e) {
		log4js.error(`[action: getAll newContrato.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

const updateEstadoContratoDeBaja = async (data) => {
	try {
		const query = `
			UPDATE dbo.servicioAdquirido 
				SET deBaja = @estado
			WHERE id = @id
		`

		const params = {
			estado: data.estado,
			id: data.id,
		}
		return await Query.queryInject(query, [params])
	} catch (e) {
		log4js.error(`[action: getAll newContrato.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

const getInfoContrato = async (data) => {
	try {
		const params = {
			id: data.id,
		}

		return await Query.querySP('dbo.SpGetContrato', [params])
	} catch (e) {
		log4js.error(`[action:  newContrato.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

const updateUser = async (data) => {
	try {
		const query = `
			UPDATE dbo.users
				SET
					usrNames = @usrNames
					,usrLastNames= @usrLastNames
					,identificationTypeId = @identificationTypeId  
					,usrCedula = @usrCedula
					,usrNroCelular = @usrNroCelular
					,usrEmail = @usrEmail
					,usrEmailAlternative = @usrEmailAlternative
				WHERE id=@id
		`
		const params = {
			id: data.iduser,
			usrNames: data.nombre,
			usrLastNames: data.apellido,
			identificationTypeId: data.tipoDoc,
			usrCedula: data.cedula,
			usrNroCelular: data.celular,
			usrEmail: data.usrEmail,
			usrEmailAlternative: data.usrEmailAlternative,
		}

		return await Query.queryInject(query, [params])
	} catch (e) {
		log4js.error(`[action:  newContrato.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

const updateContrato = async (contrato) => {
	try {
		const { idContrato, fechaNac, estadoCivil, ciudad, direccion, referido, nomina, pin, usuario } = contrato
		let beneficiarios = ''
		contrato.beneficiario.map((item) => {
			beneficiarios =
				beneficiarios +
				`INSERT INTO dbo.servicioAdquiridoBeneficiarios (parentesco, completeName, edad, servicioAdquiridoId,servicioId,userIdcreatedAt ) VALUES(${item.parentesco},'${item.nombreCompleto}',${item.edad},${idContrato},${item.servicioId},${usuario}) `
		})

		contrato.beneficiarioJuridico.map((item) => {
			beneficiarios =
				beneficiarios +
				`INSERT INTO dbo.servicioAdquiridoBeneficiarios (parentesco, completeName, edad, servicioAdquiridoId,servicioId,userIdcreatedAt ) VALUES(${item.parentesco},'${item.nombreCompleto}',${item.edad},${idContrato},${item.servicioId},${usuario}) `
		})

		const params = {
			id: idContrato,
			fnacimiento: fechaNac,
			estadoCivil,
			ciudad,
			direccion,
			referido,
			payNomina: nomina,
			pin,
			usuario,
			beneficiarios,
		}

		return await Query.querySP('dbo.SpUpdateContrato', [params])
	} catch (e) {
		log4js.error(`[action: updateContrato newContrato.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

const getCargaInitial = async (action, grupoId) => {
	try {
		return await Query.querySP('[par].[spCargaInicial]', [{ action, grupoId }])
	} catch (e) {
		log4js.error(`[action: getCargaInitial getCargaInitial.mssql.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error(mensajes('ERROR_INTERNO').message)
	}
}

module.exports = {
	saveNewContrato,
	getAllSliderSP,
	validateGroupServiceHasBeneficiario,
	getAllListaContratos,
	updateEstadoContrato,
	updateEstadoContratoDeBaja,
	getInfoContrato,
	updateUser,
	updateContrato,
	getCargaInitial,
}
