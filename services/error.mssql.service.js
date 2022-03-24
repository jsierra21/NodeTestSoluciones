const Queries = require('./../db/queries')

const guardarError = async (Origen, Controlador, Funcion, Descripcion, Usuario) => {
	const params = {
		Operacion: 'I',
		Origen,
		Controlador,
		Funcion,
		Descripcion,
		Usuario,
	}
	return await Queries.querySP('IOS.SpLogErrores', [params])
}

module.exports = {
	guardarError,
}
