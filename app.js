const express = require('express')
const app = express()
const routesApi = require('./routing/api/routes')
const routesAdmin = require('./routing/web/routes')
const cors = require('cors')
const { PORTS, PORT, PASS } = require('./config')
const errors = require('./utils/errors')
const fileUpload = require('express-fileupload')
const fs = require('fs')
const swaggerUi = require('swagger-ui-express')
const helmet = require('helmet')
const path = require('path')
const https = require('https')
const { NODE_ENV } = process.env

const swaggerDoc = require('./api/swagger.json')

// app.use(helmet())

// Implementación de cors
app.use(
	fileUpload({
		limits: { fileSize: 50 * 1024 * 1024 },
		tempFileDir: '/tmp/',
	})
)

//Headers
app.use(cors({ exposedHeaders: ['Authorization'] }))
app.use(express.json({ extended: false, limit: '100Mb' }))
app.use(express.urlencoded({ extended: false, limit: '100Mb' }))

// Ruta de la carpeta pública
const pictures = path.resolve(__dirname, 'uploads')
console.log(pictures)
app.use(express.static(pictures))

//Routes
app.get('/', (req, res) => res.status(401).json({ status: 'Servidor SI58 funcionando correctamente!!! 👌' }))

// Importación de las rutas de la app
app.use('/api/v1.0/', routesApi)
app.use('/admin/v1.0/', routesAdmin)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.disable('x-powered-by')

app.use(errors)

// Ruta de error cuando no se encuentre definida
app.get('*', (req, res) => {
	res.status(404).json({
		error: true,
		status: 404,
		body: 'Ruta no existe, favor verificar!!! 👎🏿',
	})
})

// Start server
function startServer() {
	// OpenSsl
	// OpenSsl JC
	const httpsOptions = {
		key: fs.readFileSync('./../certificates/goDaddySyspotec.key'),
		cert: fs.readFileSync('./../certificates/goDaddySyspotec.crt'),
		ca: fs.readFileSync('../certificates/gd_bundle-g2-g1.crt'),
		passphrase: PASS,
	}

	const serverHttp = app.listen(PORT, () => {
		console.log(`Servidor http escuchando en el puerto ${PORT}`)
		console.log(`Ambiente: ${NODE_ENV.toUpperCase()}`)
	})

	// const serverHttps = https.createServer(httpsOptions, app).listen(PORTS, () => {
	// 	console.log(`Servidor https escuchando en el puerto ${PORTS}`)
	// })
}

startServer()
