const solServicioService = require('./../../services/solicitudServicio.service')
const email = require('./../../utils/email/email')
const Response = require('./../../utils/response')
const log4js = require('./../../utils/log4js')()
let documentsTosSendMail

const FileSystem = require('../../utils/fileSystem')
const fileSystem = new FileSystem()

let respLoginApiFile

function controller() {
	return {
		newServiciosSolicitados: async (req, res) => {
			try {
				const resultado = await solServicioService.newServiciosSolicitados(req.body)

				email.sendEmailSolicitudRealizada(req.body)
				return { msg: resultado.recordset, status: 200 }
			} catch (e) {
				log4js.error(
					`[action: newServiciosSolicitados solicitudServicio.controller][msg: ${e.message}][file:${__filename}]`
				)
				throw Response.error(req, res, `Error interno en el servidor`, 400)
			}
		},
		saveServiciosSolicitadosDocuments: async (req, res) => {
			try {
				const { files, body } = req
				const { action, clasificadosRequiredDocuments } = body
				let serviciosSolicitadosId

				if (clasificadosRequiredDocuments === 'true') {
					if (!files || (Object.keys(req.files).length === 0) & !['edit'].includes(action)) {
						log4js.error(
							`[action: saveServiciosSolicitadosDocuments][msg: Los documentos son requeridos][file:${__filename}]`
						)
						//throw new Error('Los documentos son requeridos')
						return { msg: '¡Los documentos son requeridos!!!', status: 400 }
					}
				}

				if (!['edit'].includes(action)) {
					//Nuevo
					const { recordset } = await solServicioService.newServiciosSolicitados(body)
					const { estado, msg } = recordset[0]

					if (estado === 400) {
						return { msg, status: estado }
					}

					serviciosSolicitadosId = recordset[0].id
				} else {
					//Editar
					const { recordset } = await solServicioService.updateServiciosSolicitadosSP(body)
					serviciosSolicitadosId = body.serviciosSolicitadosId
				}

				const { infoDocs } = body
				const infoDocsParse = JSON.parse(infoDocs)

				// Validamos si se debe validar carga de documentos
				if (files) {
					respLoginApiFile = await fileSystem.autenticacionApiCapiweb()
					await loadFiles(files, serviciosSolicitadosId, infoDocsParse, body)
				} else {
					documentsTosSendMail = []
				}

				//const respfilesToSendEmail = await solServicioService.getFilesServicioSolicitado(serviciosSolicitadosId)
				//const filesToSendEmail = respfilesToSendEmail.recordset

				//Enviamos email con los adjuntos
				await email.sendEmailSolicitudRealizadaDocuments(body, serviciosSolicitadosId, documentsTosSendMail)
				deleteFileTmp(documentsTosSendMail)

				return { msg: 'Guardado exitoso', status: 200 }
			} catch (e) {
				log4js.error(
					`[action: saveServiciosSolicitadosDocuments solicitudServicio.controller][msg: ${e.message}][file:${__filename}]`
				),
					documentsTosSendMail
				throw Response.error(req, res, `Error interno en el servidor`, 400)
			}
		},
		validateActiveSolicitud: async (req, res) => {
			try {
				const { userId } = req.params
				const { groupId, serviceId } = req.query
				const data = {
					userId,
					groupId,
					serviceId,
				}
				const { recordset } = await solServicioService.validateActiveSolicitud(data)
				return { msg: recordset, status: 200 }
			} catch (e) {
				log4js.error(`[action: validateActiveSolicitud services.controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, `Error interno en el servidor`, 400)
			}
		},
		getConsultarServicioSolicitado: async (req, res) => {
			try {
				const { id } = req.params
				const { recordsets } = await solServicioService.getConsultarServicioSolicitado(id)
				return { msg: recordsets, status: 200 }
			} catch (e) {
				log4js.error(
					`[action: getConsultarServicioSolicitado solServicioService.controller][msg: ${e.message}][file:${__filename}]`
				)
				throw Response.error(req, res, `Error interno en el servidor`, 400)
			}
		},
		deleteServicioSolicitado: async (req, res) => {
			try {
				const { id } = req.params

				const { recordset } = await solServicioService.deleteServicioSolicitado(id, req.body)
				return { msg: recordset, status: 200 }
			} catch (e) {
				log4js.error(
					`[action: deleteServicioSolicitado solServicioService.controller][msg: ${e.message}][file:${__filename}]`
				)
				throw Response.error(req, res, `Error interno en el servidor`, 400)
			}
		},
		deleteOtroDocumentFromDatabase: async (req, res) => {
			try {
				const { serviciosSolicitadosDocumentosId } = req.params

				const { recordset } = await solServicioService.deleteOtroDocumentFromDatabase({
					serviciosSolicitadosDocumentosId,
					...req.body,
				})
				return { msg: recordset, status: 200 }
			} catch (e) {
				log4js.error(
					`[action: deleteOtroDocumentFromDatabase solServicioService.controller][msg: ${e.message}][file:${__filename}]`
				)
				throw Response.error(req, res, `Error interno en el servidor`, 400)
			}
		},
		getStateServiceUser: async (req, res) => {
			try {
				const { id } = req.params
				const { groupId } = req.query
				const { recordset } = await solServicioService.getStateServiceUser(id, groupId)
				return { msg: recordset, status: 200 }
			} catch (e) {
				log4js.error(
					`[action: getStateServiceUser solServicioService.controller][msg: ${e.message}][file:${__filename}]`
				)
				throw Response.error(req, res, `Error interno en el servidor`, 400)
			}
		},
		getCountSolicitudServicioJuridico: async (req, res) => {
			try {
				const { id } = req.params
				const { groupId, serviceId } = req.query
				const objecto = {
					id,
					groupId,
					serviceId,
				}
				const { recordset } = await solServicioService.validateCountSolicitudServicioJuridico(objecto)
				return { msg: recordset, status: 200 }
			} catch (e) {
				log4js.error(
					`[action: validateCountSolicitudServicioJuridico solServicioService.controller][msg: ${e.message}][file:${__filename}]`
				)
				throw Response.error(req, res, `Error interno en el servidor`, 400)
			}
		},
		searchSolicitudServicio: async (req, res) => {
			try {
				const { search } = req.params
				const { userId, groupId, servicioId } = req.query
				const { recordset } = await solServicioService.searchSolicitudServicio(search, userId, groupId, servicioId)
				return { msg: recordset, status: 200 }
			} catch (e) {
				log4js.error(`[action: searchSolicitudServicio entry.controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, 'Server error interno', 400)
			}
		},
		listaSolicitudesServicio: async (req, res) => {
			try {
				let { servicioId } = req.params
				const { recordset } = await solServicioService.listaServiciosSolicitados(servicioId)
				return { msg: recordset, status: 200 }
			} catch (e) {
				log4js.error(
					`[action: listaSolicitudesServicio solicitudservicio.controller][msg: ${e.message}][file:${__filename}]`
				)
				throw Response.error(req, res, 'Server error interno', 400)
			}
		},
		listaSolicitudesServicioFin: async (req, res) => {
			try {
				const { recordset } = await solServicioService.listaServiciosSolicitadosFin(req.body)
				return { msg: recordset, status: 200 }
			} catch (e) {
				log4js.error(
					`[action: listaSolicitudesServicioFin solicitudservicio.controller][msg: ${e.message}][file:${__filename}]`
				)
				throw Response.error(req, res, 'Server error interno', 400)
			}
		},
		OneSolicitudesServicio: async (req, res) => {
			try {
				const { recordsets } = await solServicioService.OneServiciosSolicitados(req.body)
				return { msg: recordsets, status: 200 }
			} catch (e) {
				log4js.error(
					`[action: listaSolicitudesServicio solicitudservicio.controller][msg: ${e.message}][file:${__filename}]`
				)
				throw Response.error(req, res, 'Server error interno', 400)
			}
		},
		guardarComentario: async (req, res) => {
			try {
				const { recordset } = await solServicioService.guardarComentario(req.body)
				email.sendEmailRespuestaServicio(req.body)
				return { msg: recordset, status: 200 }
			} catch (e) {
				log4js.error(`[action: guardarComentario solicitudservicio.controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, 'Server error interno', 400)
			}
		},
		finalizarServicioSolicitado: async (req, res) => {
			try {
				const { recordset } = await solServicioService.finalizarServiciosSolicitados(req.body)
				return { msg: recordset, status: 200 }
			} catch (e) {
				log4js.error(
					`[action: finalizarServicioSolicitado solicitudservicio.controller][msg: ${e.message}][file:${__filename}]`
				)
				throw Response.error(req, res, 'Server error interno', 400)
			}
		},
		serviciosSolicitadosDocumentosId: async (req, res) => {
			try {
				const { recordset } = await solServicioService.finalizarServiciosSolicitados(req.body)
				return { msg: recordset, status: 200 }
			} catch (e) {
				log4js.error(
					`[action: finalizarServicioSolicitado solicitudservicio.controller][msg: ${e.message}][file:${__filename}]`
				)
				throw Response.error(req, res, 'Server error interno', 400)
			}
		},
	}
}

function validateDocuments() {}

/**
 * Guarda archivos en FileServer
 * @param {*} files SArchivos a guardar
 * @param {*} serviciosSolicitadosId Id de la solicud
 * @param {*} infoDocs Json con toda la informacion de los archivos a guardar
 * @param {*} body Informacion generica de la solicitud
 */
async function loadFiles(files, serviciosSolicitadosId, infoDocs, body) {
	documentsTosSendMail = []
	try {
		const archivos = Object.entries(files)
		await Promise.all(
			archivos.map(async (file) => {
				await saveFile(file[1], serviciosSolicitadosId, infoDocs, body)
			})
		)
	} catch (e) {
		log4js.error(`[action: loadFiles solicitudServicio.controller][msg: ${e.message}][file:${__filename}]`)
		throw new Error(e)
	}
}

/**
 * Metodo encargado del guardado de la imagen y posterior guardado en base de datos
 * @param {*} file => file obtenido de express-upload
 * @param {*} serviciosSolicitadosId = id generado al guardar registro al crear solicitud si aplica
 * @param {*} infoDocs => objeto con las propiedades del archivo a guardar
 * @param {*} body => body enviar desde la vista
 */
async function saveFile(file, serviciosSolicitadosId, infoDocs, body) {
	try {
		const docToSave = infoDocs.filter((item) => item.documentsName === file.name)

		const response1 = await fileSystem.guardarImagenTemporal(file, serviciosSolicitadosId, body.userId, 'documentos')
		//const imgBD = objImgDB(serviciosSolicitadosId, docToSave, body, response, file)

		const response2 = await fileSystem.guardarFileServerOnline(file, 'documentos', 3, respLoginApiFile.data.token)

		const imgBD = objImgDB(serviciosSolicitadosId, docToSave, body, response1, file, response2)

		if ([0, 1].includes(parseInt(docToSave[0].wasEdited, 10))) {
			await solServicioService.serviciosSolicitadosDocumentos(imgBD)
		} else if ([2].includes(parseInt(docToSave[0].wasEdited, 10))) {
			await solServicioService.updateServicioSolicitadoDocumentos(imgBD)
		}

		getDocumentsToSendMail(imgBD)

		return
	} catch (e) {
		log4js.error(`[action: saveFile solicitudServicio.controller][msg: ${e.message}][file:${__filename}]`)
		throw new Error(e)
	}
}

/**
 * Creamos objeto a enviar para el guardado en base de datos
 * @param {*} serviciosSolicitadosId
 * @param {*} doc => objeto con la data interna del documento a ser guardado
 * @param {*} body => body recibido de la vista
 * @param {*} retorno => data recibida despues del guardado del archivo
 * @param {*} file => file obtenido del express upload
 * @returns
 */
function objImgDB(serviciosSolicitadosId, docToSave, body, response1, file, response2) {
	// return {
	// 	serviciosSolicitadosId,
	// 	serviciosSolicitadosDocumentosId: docToSave[0].serviciosSolicitadosDocumentosId,
	// 	serviceId: body.servicioId,
	// 	userId: body.userId,
	// 	documentsId: docToSave[0].id,
	// 	documentsName: file.name,
	// 	name: response1.nombreArchivo,
	// 	documentsUrl: response1.ruta,
	// 	documentsSize: file.size,
	// 	documentsExt: file.mimetype,
	// 	userIdupdateAt: body.userId,
	// }

	return {
		serviciosSolicitadosId,
		serviciosSolicitadosDocumentosId: docToSave[0].serviciosSolicitadosDocumentosId,
		serviceId: body.servicioId,
		userId: body.userId,
		documentsId: docToSave[0].id,
		documentsName: file.name,
		name: response2.data.nombreInterno,
		documentsWebUrl: response2.data.pathWebAbsolute,
		documentspathWebRelative: response2.data.pathWebRelative,
		documentsUrl: response1.ruta,
		documentsUrlAbsolute: response1.pathUserFinal,
		documentsSize: file.size,
		documentsExt: file.mimetype,
		userIdupdateAt: body.userId,
	}
}

function getDocumentsToSendMail(imgBD) {
	try {
		documentsTosSendMail.push(imgBD)
	} catch (e) {
		log4js.error(`[action: getDocumentsToSendMail solicitudServicio.controller][msg: ${e.message}][file:${__filename}]`)
		throw new Error(e)
	}
}

async function deleteFileTmp(arrayData) {
	await Promise.all(
		arrayData.map((file) => {
			fileSystem.deleteFileTmp(file.documentsUrl)
		})
	)
}

module.exports = controller
