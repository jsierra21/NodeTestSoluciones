const HTML5ToPDF = require('./lib')
const path = require('path')
const { PlantillasContratos } = require('./plantillasContratos/plantillas')
let plantillas = null
const FileSystem = require('./../fileSystem')
const fileSystem = new FileSystem()

const run = async (data) => {
	const { dataContratoPdf } = data
	const name = `${dataContratoPdf.nombreArchivo.split('.')[0]}.pdf`
	let urlContrato = `${dataContratoPdf.pathBD}`

	plantillas = new PlantillasContratos()
	const contratoHTML = plantillas.armarPlantilla(data)

	urlContratoPdf = path.join(__dirname, `./../../uploads/${urlContrato}`, `${name}`)

	const html5ToPDF = new HTML5ToPDF({
		inputBody: contratoHTML,
		outputPath: urlContratoPdf,
		include: [path.join(__dirname, 'assets', 'basic.css'), path.join(__dirname, 'assets', 'custom-margin.css')],
	})

	await html5ToPDF.start()
	await html5ToPDF.build()
	await html5ToPDF.close()

	// const token = await fileSystem.autenticacionApiCapiweb()
	// const rutaCompleta = path.join(__dirname, `./../../uploads/${urlContrato}`, `${name}`)
	// console.log(rutaCompleta)
	// const respApiFileServer = await fileSystem.guardarFileServerOnline2('firmas', 3, token, rutaCompleta)

	return {
		name,
		urlContratoPdf,
	}
}

module.exports = {
	run,
}
