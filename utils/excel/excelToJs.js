const ExcelJS = require('exceljs')
const path = require('path')
const parametros = require('./../../config/index')
const pathDownloadToExcel = parametros.pathDownloadToExcel

async function informe1(res, data) {
	try {
		const workbook = new ExcelJS.Workbook()

		workbook.creator = 'Me'
		workbook.lastModifiedBy = 'Her'
		workbook.created = new Date(1985, 8, 30)
		workbook.modified = new Date()
		workbook.lastPrinted = new Date(2016, 9, 27)

		// Set workbook dates to 1904 date system
		workbook.properties.date1904 = true

		const ws = workbook.addWorksheet('UsuariosCuenta')

		// ws.addRow(Object.keys(data[0]))
		ws.columns = [
			{ header: 'Id', key: 'id', width: 5, style: { font: { name: 'Arial Black' } } },
			{ header: 'Email', key: 'email', width: 30 },
			{ header: 'Nombre', key: 'name', width: 25 },
			{ header: 'Tipo', key: 'tipo', width: 5 },
			{ header: 'Cedula', key: 'cedula', width: 15 },
			{ header: 'Nro celular', key: 'phonenumber', width: 15 },
			{ header: 'Tel Fijo', key: 'phonenumber', width: 15 },
			{ header: 'Dirección', key: 'address', width: 30 },
			{ header: 'Header', key: 'header', width: 30 },
			{ header: 'Fecha creación', key: 'date', width: 15 },
			{ header: 'Fecha last login', key: 'date', width: 15 },
			{ header: 'Cuenta', key: 'cuenta', width: 15 },
			{ header: 'Estado', key: 'state', width: 15 },
		]

		data.map((registro) => {
			ws.addRow(Object.values(registro))
		})

		// // Commit a completed row to stream
		// row.commit()
		const options = {
			dateFormat: 'DD/MM/YYYY HH:mm:ss',
			dateUTC: true, // use utc when rendering dates
		}
		// return await workbook.xlsx.writeFile(`Excel1.xlsx`, options)

		// res is a Stream object
		res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
		res.setHeader('Content-Disposition', 'attachment; filename=' + 'informeUsuario.xlsx')

		return workbook.xlsx.write(res).then(function () {
			res.status(200).end()
		})
	} catch (error) {
		console.log(error)
	}
}

/**
 * Funcion generica para generar excel y devolverlo por res
 * @param {*} res
 * @param {*} _data = variable con la informacion para generar excel
 * @returns
 */
async function toExcel(res, _data, name) {
	try {
		const info = _data
		const workbook = new ExcelJS.Workbook()

		workbook.creator = 'Syspotec S.A.S'
		workbook.lastModifiedBy = 'Syspotec S.A.S'
		workbook.created = new Date()
		workbook.modified = new Date()
		workbook.lastPrinted = new Date()

		// Set workbook dates to 1904 date system
		workbook.properties.date1904 = true

		const ws = workbook.addWorksheet(name)

		let header = []

		if (info.length !== 0) {
			Object.keys(info[0]).map((item) => {
				header.push({
					header: item,
					key: item,
					width: 30,
				})
			})
			ws.columns = header

			info.map((registro) => {
				ws.addRow(Object.values(registro))
			})

			// Making first line in excel bold
			ws.getRow(1).eachCell((cell) => {
				cell.font = { bold: true }
			})
		}

		// // Commit a completed row to stream
		// row.commit()
		const options = {
			dateFormat: 'DD/MM/YYYY HH:mm:ss',
			dateUTC: true, // use utc when rendering dates
		}
		// return await workbook.xlsx.writeFile(`Excel1.xlsx`, options)

		// res is a Stream object
		res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
		res.setHeader('Content-Disposition', 'attachment; filename=' + `${name}.xlsx`)

		// return workbook.xlsx.write(res).then(function () {
		// 	res.status(200).end()
		// })

		const pathFinal = path.resolve(__dirname, `../../uploads/files`)
		// Set variable to current date and time
		const now = new Date()

		const nameFile = `${now.getTime()}_${name}.xlsx`
		const data = await workbook.xlsx.writeFile(`${pathFinal}/${nameFile}`).then(() => {
			res.send({
				status: 'success',
				message: 'file successfully downloaded',
				path: `${pathFinal}/${nameFile}`,
				pathToDownload: `${pathDownloadToExcel}${nameFile}`,
			})
		})
	} catch (error) {
		console.log(error)
		res.send({
			status: 'error',
			message: 'Something went wrong',
		})
	}
}

module.exports = {
	informe1,
	toExcel,
}
