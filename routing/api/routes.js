const auth = require('../../api/auth/router')
const users = require('../../api/users/router')
const logs = require('../../api/logs/router')
const serviceList = require('../../api/services/router')
const sliders = require('../../api/sliders/router')
const contract = require('../../api/newContract/router')
const solicitudServicio = require('../../api/solicitudServicio/router')
const parents = require('../../api/parents/router')
const serviciosSolicitadosClasificacion = require('../../api/serviciosSolicitadosClasificacion/router')
const cargaInicial = require('../../api/cargaInicial/router')
const selectorFind = require('../../api/selectorFind/router')

module.exports = [
	auth,
	users,
	logs,
	serviceList,
	sliders,
	contract,
	solicitudServicio,
	parents,
	serviciosSolicitadosClasificacion,
	cargaInicial,
	selectorFind,
]
