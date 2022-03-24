const empresaService = require('./../services/empresa.mssql.service')

class Empresa {
	empresaData = {
		empresa: '',
		descripcion: '',
		urlImg: '',
		sitioWeb: '',
		email: '',
		appWebUrl: '',
		pbx: '',
		appMovilUrl: '',
	}
	constructor() {}

	async getEmpresaData() {
		const { recordset } = await empresaService.getEmpresa()
		this.empresaData.empresa = recordset[0].empresa
		this.empresaData.descripcion = recordset[0].descripcion
		this.empresaData.urlImg = recordset[0].urlImg
		this.empresaData.sitioWeb = recordset[0].sitioWeb
		this.empresaData.email = recordset[0].email
		this.empresaData.appWebUrl = recordset[0].appWebUrl
		this.empresaData.appMovilUrl = recordset[0].appMovilUrl
		this.empresaData.pbx = recordset[0].pbx
		return this.empresaData
	}
}

module.exports = Empresa
