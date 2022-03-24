const admin = require('firebase-admin')
const moment = require('moment')
let resp = null

var serviceAccount = require('./../keyExtract/Firebase/androidexample-f9386-firebase-adminsdk-e2on1-b97a2f0bda.json')

const sendMessage = async (token, data) => {
	// Llamar a metodo para obtener el token del usuario y enviar mensaje

	if (resp === null) {
		resp = admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
			databaseURL: 'https://loginioni4.firebaseio.com',
		})
	}

	// This registration token comes from the client FCM SDKs.
	const date = moment().format('DD-MM-YYYY HH:mm:ss')
	const payload = {
		token,
		notification: {
			title: 'Titulo',
			body: `Cuerpo del mensaje: ${date}`,
		},
		android: {
			notification: {
				icon: 'stock_ticker_update',
				image: 'https://aseocapital.com.pa/wp-content/uploads/2017/09/LOGO-ASEO-C-01-e1506380790927.png',
				color: '#7e55c3',
			},
		},
		data,
	}

	// Send a message to the device corresponding to the provided
	// registration token.
	admin
		.messaging()
		//.sendToDevice(token, payload)
		.send(payload)
		.then((response) => {
			// Response is a message ID string.
			console.log('Successfully sent message:', response)
		})
		.catch((error) => {
			console.log('Error sending message:', error)
		})
}

// const token =
// 	'fSEL-4haSZm1RGp1yUqJ45:APA91bFr-eNjHJdYMkmhpUGXRFZ9KLLJqEVlLtZmP1hkkaRPuviAel5SezjymDYXFcaxM1kLiWlNgy9ZpKkapyZhpkHo6w88GtKOXttRVgafqC70XWrj3o88vSWGDq47CoBrdVoBm4wC'
// firebase()
// sendMessage(token, { campo1: '1', campo2: '2' })

module.exports = {
	sendMessage,
}
