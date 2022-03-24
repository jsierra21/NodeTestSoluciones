var Service = require('node-windows').Service

// Create a new service object
var svc = new Service({
	name: 'SolucionesIntregrales58',
	description: 'Aplicativo con un kit de herramientas.',
	script: 'F:\\PublicadasSitioseguro\\NodeJs\\\solucionesIntregrales58\\app.js',
	nodeOptions: ['--harmony', '--max_old_space_size=4096'],
})

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall', function () {
	console.log('Uninstall complete.');
	console.log('The service exists: ',svc.exists);
})

svc.uninstall()
