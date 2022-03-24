const path = require('path')
const fs = require('fs')
const uniqid = require('uniqid')
const moment = require('moment')

class GuardarImagen {
	constructor() {}

	/**
	 * Guardamos archivo en FileServer
	 * @param {*} file Archivo a guardar
	 * @param {*} path ruta
	 * @param {*} nombreArchivo nombreArchivo a guardar
	 * @returns Objeto con datos del guardado del archivo
	 */
	async saveFile(file, path, nombreArchivo) {
		return await new Promise((resolve, reject) => {
			try {
				const filePath = `${path.pathUserFinal}/${nombreArchivo}.jpg`
				const base64Data = file.replace(/^data:image\/png;base64,/, '')
				fs.writeFile(`${filePath}`, base64Data, 'base64', function (err) {
					console.log(err)
					reject(err)
				})

				resolve(true)
			} catch (e) {
				reject(e)
			}
		})
	}

	/**
	 * Generamos nombre unico para el guardado del archivo
	 * @returns Nombre generado
	 */
	generarNombreUnico() {
		const idUnico = uniqid()

		return idUnico
	}

	/**
	 * Creamos la carpeta del usuario en caso que no exista
	 * @param {*} userId id del usuario logueado
	 * @param {*} carpeta ruta de la carpeta creada
	 * @returns obtejo con ruta absoluta y ruta local de NodeJs
	 */
	crearCarpetaUsuario(userId, carpeta) {
		const pathBD = `${carpeta}/`
		const pathRaiz = path.resolve(__dirname, `../uploads/${carpeta}`)
		const pathUser = `${pathRaiz}/`
		const pathDate = `${pathUser}/`
		const pathUserCuentaContrato = `${pathDate}`
		const pathUserFinal = `${pathUserCuentaContrato}/`

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

		exist = fs.existsSync(pathUserCuentaContrato)
		if (!exist) {
			fs.mkdirSync(pathUserCuentaContrato)
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
}

module.exports = GuardarImagen
