const path = require('path')
const fs = require('fs')
const moment = require('moment')
const uniqid = require('uniqid')
const FormData = require('form-data')
const axios = require('axios').default
const { UrlApiFS } = require('./../config')

class FileSystem {
	constructor() {}

	async guardarImagenTemporal(file, ciclo, userId, carpeta) {
		return new Promise((resolve, reject) => {
			// Crear carpeta
			const path = this.crearCarpetaUsuario(userId, ciclo, carpeta)

			// Nombre Archivo
			const objectName = this.generarNombreUnico(file.name)
			const filePath = `${path.pathUserFinal}/${objectName.CompleteName}`

			//Mover archivo de tmp a carpetaFinal
			file.mv(filePath, (err) => {
				if (err) {
					reject(err)
				} else {
					const retorno = {
						...objectName,
						ruta: `${path.pathBD}/${objectName.CompleteName}`,
						...path,
					}
					console.log(`Archivo cargado exitosamente!!!`)
					resolve(retorno)
				}
			})
		})
	}

	async guardarImagenTemporalOffline(file, ciclo, userId, carpeta) {
		return new Promise((resolve, reject) => {
			// Crear carpeta
			const path = this.crearCarpetaUsuario(userId, ciclo, carpeta)
			const filePath = `${path.pathUserFinal}/${file.name}`

			//Mover archivo de tmp a carpetaFinal
			file.mv(filePath, (err) => {
				if (err) {
					reject(err)
				} else {
					const retorno = {
						ruta: `${path.pathBD}/${file.name}`,
						...path,
					}
					console.log(`Imagen cargada exitosamente!!!`)
					resolve(retorno)
				}
			})
		})
	}

	async autenticacionApiCapiweb() {
		const datos = {
			User: 'admin',
			Password: 'admin',
		}

		const respuesta = await axios.post(`${UrlApiFS}/Token`, datos)

		return respuesta
	}

	async guardarFileServerOnline(file, carpeta, id, token, ciclo, userId) {
		return new Promise(async (resolve, reject) => {
			const ruta = await this.guardarImagenTemporal(file, ciclo, userId, carpeta)
			const rutaCompleta = path.join(ruta.pathUserFinal, ruta.CompleteName)

			const data = new FormData()
			data.append('Files', fs.createReadStream(rutaCompleta))
			data.append('IdPathFileServer', id)
			data.append('Carpeta', carpeta)

			let respuesta
			let tokenCompleto = `Bearer ${token}`
			const headerForm = { ...data.getHeaders(), Authorization: tokenCompleto }

			try {
				respuesta = await axios.post(`${UrlApiFS}/Files`, data, {
					headers: headerForm,
				})

				// Eliminamos los archivos temporales del servidor
				fs.unlinkSync(rutaCompleta)

				if (![null, undefined].includes(respuesta)) {
					const { status, data } = respuesta
					if (status === 200) {
						resolve(data)
					} else {
						reject('Error inesperado al intentar subir las imágenes')
					}
				} else {
					reject('Error inesperado al intentar subir las imágenes')
				}
			} catch (error) {
				reject(error)
			}
		})
	}

	async guardarFileServerOnline2(carpeta, id, token, rutaCompleta) {
		return new Promise(async (resolve, reject) => {
			const data = new FormData()
			data.append('Files', fs.createReadStream(rutaCompleta))
			data.append('IdPathFileServer', id)
			data.append('Carpeta', carpeta)

			let respuesta
			let tokenCompleto = `Bearer ${token}`
			const headerForm = { ...data.getHeaders(), Authorization: tokenCompleto }

			try {
				respuesta = await axios.post(`${UrlApiFS}/Files`, data, {
					headers: headerForm,
				})

				// Eliminamos los archivos temporales del servidor
				fs.unlinkSync(rutaCompleta)

				if (![null, undefined].includes(respuesta)) {
					const { status, data } = respuesta
					if (status === 200) {
						resolve(data)
					} else {
						reject('Error inesperado al intentar subir las imágenes')
					}
				} else {
					reject('Error inesperado al intentar subir las imágenes')
				}
			} catch (error) {
				reject(error)
			}
		})
	}

	async guardarServerMultiplesFiles(files, carpeta, id, token, ciclo, userId) {
		console.log(files)
		return new Promise(async (resolve, reject) => {
			let data = new FormData()
			data.append('IdPathFileServer', id)
			data.append('Carpeta', carpeta)
			let arrayFilesTmp = []

			await Promise.all(
				files.map(async (file) => {
					const ruta = await this.guardarImagenTemporalOffline(file, ciclo, userId, carpeta)
					const rutaCompleta = path.join(ruta.pathUserFinal, file.name)
					data.append('Files', fs.createReadStream(rutaCompleta))
					arrayFilesTmp.push(rutaCompleta)
				})
			)

			let respuesta
			let tokenCompleto = `Bearer ${token}`
			const headerForm = { ...data.getHeaders(), Authorization: tokenCompleto }

			try {
				respuesta = await axios.post(`${UrlApiFS}/Files`, data, {
					headers: headerForm,
				})

				// Eliminamos los archivos temporales del servidor
				await Promise.all(
					arrayFilesTmp.map((rutaCompleta) => {
						fs.unlinkSync(rutaCompleta)
					})
				)

				if (![null, undefined].includes(respuesta)) {
					const { status, data } = respuesta
					if (status === 200) {
						resolve(data)
					} else {
						reject('Error inesperado al intentar subir las imágenes')
					}
				} else {
					reject('Error inesperado al intentar subir las imágenes')
				}
			} catch (error) {
				reject(error)
			}
		})
	}

	generarNombreUnico(nombreOriginal) {
		const nombreArr = nombreOriginal.split('.')
		const extension = nombreArr[nombreArr.length - 1]

		const idUnico = uniqid()
		//const idUnico = moment().unix()

		return { CompleteName: `${idUnico}.${extension}`, justName: idUnico }
	}

	crearCarpetaUsuario(userId, ciclo, carpeta) {
		// const urlServer = '\\\\syspotecdata.file.core.windows.net\\movlecturaacueductonodejs'
		const pathBD = carpeta
		const pathRaiz = path.resolve(__dirname, `../uploads/${carpeta}`)
		const pathUserFinal = pathRaiz

		let exist = fs.existsSync(pathUserFinal)
		if (!exist) {
			fs.mkdirSync(pathRaiz)
		}

		const paths = {
			pathUserFinal,
			pathBD,
		}

		return paths
	}

	extraerNombreArchivo(fileName) {
		const extension = path.extname(fileName)
		return path.basename(fileName, extension)
	}

	deleteFileTmp(documentsUrl) {
		// Eliminamos los archivos temporales del servidor
		const ruta = path.resolve(__dirname, `../uploads/${documentsUrl}`)
		fs.unlinkSync(ruta)
	}
}

module.exports = FileSystem
