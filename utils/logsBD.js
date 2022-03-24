const log = require('./../services/logsBD')

class LogsBD {
	constructor() {}

	saveLogs(message) {
		log.saveLogs(message)
	}

	consultartLogs() {
		log.consultLog()
	}

	eliminarLogs(id) {
		log.deleteLogs()
	}
}

module.exports = LogsBD
