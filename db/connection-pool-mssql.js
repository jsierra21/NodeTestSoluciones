require('dotenv').config()
const parametros = require('./../config/index')
const sql = require('mssql')
const LogBD = require('./../utils/logsBD')
const logBD = new LogBD()

const config = {
	user: parametros.SqlServer.MSSQL_USERNAME_SQLSERVER,
	password: parametros.SqlServer.MSSQL_PASSWORD_SQLSERVER,
	server: parametros.SqlServer.MSSQL_HOST_SQLSERVER, // You can use 'localhost\\instance' to connect to named instance
	database: parametros.SqlServer.MSSQL_DATABASE_SQLSERVER,
	pool: {
		max: 10,
		min: 0,
		idleTimeoutMillis: 30000,
	},
	options: {
		encrypt: true, // for azure
		trustServerCertificate: true, // change to true for local dev / self-signed certs
	},
}

// run a query against the global connection pool
function createPool() {
	let pool
	try {
		// async/await style:
		console.log(`Creamos pool de conexion SqlServer..`)
		pool = new sql.ConnectionPool(config)

		const pool1Connect = pool.connect()

		pool.connect((err) => {
			console.error(err)
		})
		return { pool1Connect, pool }
	} catch (error) {
		log4js.error(`[action: createPool ExecuteInyectStoreProcedure][msg: ${JSON.stringify(e)}][file:${__filename}]`)
		throw new Error('Internal error server')
	}
}

module.exports = {
	createPool,
}
