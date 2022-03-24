require('dotenv').config()

module.exports = {
	sequelize: {
		username: process.env.SEQUELIZE_USERNAME_DEV,
		password: process.env.SEQUELIZE_PASSWORD_DEV,
		database: process.env.SEQUELIZE_DATABASE_DEV,
		host: process.env.SEQUELIZE_HOST_DEV,
		dialect: 'mssql',
		logging: (msg) => console.log(msg),
	},

	// Seed database on startup
	seedDB: false,
	SqlServer: {
		MSSQL_USERNAME_SQLSERVER: process.env.MSSQL_USERNAME_SQLSERVER_DEVELOPMENT,
		MSSQL_PASSWORD_SQLSERVER: process.env.MSSQL_PASSWORD_SQLSERVER_DEVELOPMENT,
		MSSQL_DATABASE_SQLSERVER: process.env.MSSQL_DATABASE_SQLSERVER_DEVELOPMENT,
		MSSQL_HOST_SQLSERVER: process.env.MSSQL_HOST_SQLSERVER_DEVELOPMENT,
	},
	mail: {
		user: process.env.MAILUSER,
		password: process.env.MAILPASSWORD,
	},
	PASS: 'Syspotec2020',
	pathDownloadToExcel: 'http://localhost:8185/files/',
	UrlApiFS: process.env.URL_API_FILE_SERVER,
}
