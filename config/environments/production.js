require('dotenv').config()

module.exports = {
	sequelize: {
		username: process.env.SEQUELIZE_USERNAME || 'username',
		password: process.env.SEQUELIZE_PASSWORD || 'password',
		database: process.env.SEQUELIZE_DATABASE || 'database',
		host: process.env.SEQUELIZE_HOST || 'host',
		dialect: 'mssql',
		operatorsAliases: false,
		logging: (msg) => console.log(msg),
	},

	// Seed database on startup
	seedDB: true,
	SqlServer: {
		MSSQL_USERNAME_SQLSERVER: process.env.MSSQL_USERNAME_SQLSERVER_PRODUCCION,
		MSSQL_PASSWORD_SQLSERVER: process.env.MSSQL_PASSWORD_SQLSERVER_PRODUCCION,
		MSSQL_DATABASE_SQLSERVER: process.env.MSSQL_DATABASE_SQLSERVER_PRODUCCION,
		MSSQL_HOST_SQLSERVER: process.env.MSSQL_HOST_SQLSERVER_PRODUCCION,
	},
	mail: {
		user: process.env.MAILUSER,
		password: process.env.MAILPASSWORD,
	},
	PASS: 'Syspotec2020',
	pathDownloadToExcel: 'https://si58nodejs.syspotec.co:8185/files/',
	UrlApiFS: process.env.URL_API_FILE_SERVER,
}
