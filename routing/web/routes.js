const auth = require('./../../api/auth/router')
const users = require('./../../api/users/router')
const cargaArchivos = require('./../../api/cargaArchivos/router')
const pbx = require('./../../api/pbx/router')
const listAfiliados = require('./../../api/listAfiliados/router')
const contract = require('../../api/newContract/router')
const parents = require('../../api/parents/router')
const solicitudServicio = require('../../api/solicitudServicio/router')
const reports = require('../../api/reports/router')
const stadistics = require('../../api/stadistic/router')

module.exports = [
	auth,
	users,
	cargaArchivos,
	pbx,
	listAfiliados,
	contract,
	parents,
	solicitudServicio,
	reports,
	stadistics,
]
