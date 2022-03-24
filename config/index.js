const path = require('path')
const _ = require('lodash')

let envFile = require('./environments')

all = {
	language: 'es',
	host: process.env.URL_CSHARP,
	PORT: process.env.PORT || 3001,
	PORTS: process.env.PORTS || 3002,
	sessionEncrypt: '$ZC6rNk/Y5MWPj8-3Q0WcK48ZgHvL.',
	sessionToken: '$Tv8eZm/G2jEwI9-5V9TLK86bQGcD.',
	sessionTime: 1, // Definicion en horas de sesión
	appPath: path.dirname(__dirname),
	emailGoogle: {
		host: 'smtp.gmail.com',
		port: 465,
		secure: true, // true for 465, false for other ports
		auth: {
			user: 'alfonso.navarro@syspotec.com',
			pass: 'Syspotec**2020',
		},
		tls: {
			rejectUnauthorized: false,
		},
	},
	emailOutllook: {
		host: process.env.MAILHOST,
		secureConnection: process.env.MAILSECURE, // true for 465, false for other ports
		port: process.env.MAILPORT,
		tls: {
			ciphers: process.env.MAILCIFRADO,
		},
		auth: {
			user: process.env.MAIL_USERNAME,
			pass: process.env.MAIL_PASSWORD,
		},
	},
	fileExtensions: {
		visit: ['image/jpeg', 'image/png'],
	},
}

module.exports = _.merge(all, envFile || {})
