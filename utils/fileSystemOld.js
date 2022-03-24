const path = require('path')
const fs = require('fs')
const moment = require('moment')
const uniqid = require('uniqid')

//Metodos para guardar en el FileServer
const axios = require('axios')
const FormData = require('form-data')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

class FileSystem {
	constructor() {}

	async guardarImagenTemporal(file, idSolicitudServicio, userId, carpeta) {
		return await new Promise((resolve, reject) => {
			try {
				// Crear carpeta
				const path = this.crearCarpetaUsuario(userId, idSolicitudServicio, carpeta)

				// Nombre Archivo
				const nombreArchivo = this.generarNombreUnico(file.name)
				const filePath = `${path.pathUserFinal}/${nombreArchivo}`

				//Mover archivo de tmp a carpetaFinal
				file.mv(filePath, (err) => {
					if (err) {
						reject(err)
					} else {
						const retorno = {
							nombreArchivo,
							ruta: `${path.pathBD}/${nombreArchivo}`,
							...path,
						}
						resolve(retorno)
					}
				})
			} catch (e) {
				reject(e)
			}
		})
	}

	generarNombreUnico(nombreOriginal) {
		const nombreArr = nombreOriginal.split('.')
		const extension = nombreArr[nombreArr.length - 1]

		const idUnico = uniqid()

		return `${idUnico}.${extension}`
	}

	crearCarpetaUsuario(userId, id, carpeta) {
		const date = moment().format('YYYY-MM-DD')
		const pathBD = `${carpeta}/${userId}/${id}`
		const pathRaiz = path.resolve(__dirname, `../uploads/${carpeta}`)
		const pathUser = pathRaiz + `/${userId}`
		const pathDate = `${pathUser}`
		const pathUserFinal = `${pathDate}/${id}`
		console.log(pathUserFinal)

		let exist = fs.existsSync(pathRaiz)
		if (!exist) {
			fs.mkdirSync(pathRaiz)
		}

		exist = fs.existsSync(pathUser)
		if (!exist) {
			fs.mkdirSync(pathUser)
		}

		exist = fs.existsSync(pathDate)
		if (!exist) {
			fs.mkdirSync(pathDate)
		}

		exist = fs.existsSync(pathUserFinal)
		if (!exist) {
			fs.mkdirSync(pathUserFinal)
		}

		const paths = {
			pathUserFinal,
			pathBD,
		}

		return paths
	}

	async autenticacionApiCapiweb() {
		const datos = {
			User: 'admin',
			Password: 'admin',
		}
		const respuesta = await axios.post('https://appapirestcapiwebtest.syspotec.co/api/Token', datos)

		return respuesta
	}

	async guardarFileServer(file, carpeta, id, token) {
		console.log(token)

		const ruta = await this.guardarImagenTemporal(file, 1, 1, carpeta)

		const data = new FormData()
		data.append('Files', fs.createReadStream(ruta.pathUserFinal + ruta.nombreArchivo))
		data.append('IdPathFileServer', id)
		data.append('Carpeta', carpeta)

		let tokenCompleto = `Bearer ${token}`

		const respuesta = await fetch('https://appapirestcapiwebtest.syspotec.co/api/Files', {
			headers: {
				Authorization: tokenCompleto,
			},
			method: 'POST',
			body: data,
		})
		/*.then(res => res.json())
        .then(dato => {
			console.log(dato);
         return dato;
			
        })*/

		const resultado = await respuesta.json()
		console.log(resultado)
		fs.unlinkSync(ruta.pathUserFinal + ruta.nombreArchivo)
		return resultado
	}
}

module.exports = FileSystem
