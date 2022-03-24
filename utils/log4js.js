'use strict'

const log4js = require('log4js')
const moment = require('moment')
const path = require('path')

const logsPath = `${path.dirname(__dirname)}/logs/`
const filePath = `${logsPath}${moment().format('YYYYMMDD')}.log`

log4js.configure({
	appenders: {
		solucionesIntegrales58: {
			type: 'file',
			filename: filePath,
		},
	},
	categories: {
		default: {
			appenders: ['solucionesIntegrales58'],
			level: 'info',
		},
	},
})

module.exports = () => log4js.getLogger('solucionesIntegrales58')
