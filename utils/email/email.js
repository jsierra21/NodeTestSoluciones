// TODO: Pasar la estructura del html a una funcionalidad independiente

const nodemailer = require('nodemailer')
const { emailOutllook } = require('../../config/')
//const empresaService = require('./../../services/empresa.mssql.service')
const path = require('path')

//const email = emailOutllook

const from = emailOutllook.auth.user
const width = `100%`
const heigthImg = `100px`

let bussiness
let empresa
let descripcion
let urlImg
let sitioWeb
let email
let appWebUrl
let appMovilUrl
let pbx

const Empresa = require('./../empresa')
new Empresa().getEmpresaData().then((resp) => {
	bussiness = resp
	empresa = bussiness.empresa
	descripcion = bussiness.descripcion
	urlImg = bussiness.urlImg
	sitioWeb = bussiness.sitioWeb
	email = bussiness.email
	appWebUrl = bussiness.appWebUrl
	appMovilUrl = bussiness.appMovilUrl
	pbx = bussiness.pbx
})

module.exports = {
	sendEmail: async (data) => {
		try {
			const codVerificacion = new Date().getMilliseconds()
			const transporter = nodemailer.createTransport(emailOutllook)
			const { usrEmail } = data
			const resultado = await transporter.sendMail({
				from: from,
				to: `${usrEmail}`,
				subject: `Validar email registro ${empresa} : ${data.usrNames} ${data.usrLastNames}`,
				text: 'Por favor registrar este codigo en la App para validar su correo electronico',
				html: `<div style="margin:0;padding:0" dir="ltr" bgcolor="#ffffff">
						<table border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse:collapse">
							<tbody>
								<tr>
									<td style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;background:#ffffff">
										<table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
											<tbody>
												<tr>
												<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
												<td>
												<table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
													<tbody>
														<tr>
															<td height="15" style="line-height:15px" colspan="3">&nbsp;</td>
														</tr>
														<tr>
															<td width="100%" height="100%" align="left" valign="middle">
																<img src="${urlImg}" width="${width}" height="${heigthImg}" style="border:0">
															</td>
														</tr>
														<tr style="border-bottom:solid 1px #e5e5e5">
															<td height="15" style="line-height:15px" colspan="3">&nbsp;</td>
														</tr>
													</tbody>
												</table>
												</td>
												<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
											</tr>
												<tr>
													<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
													<td>
													<table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
														<tbody>
															<tr>
																<td height="28" style="line-height:28px">&nbsp;</td>
															</tr>
															<tr>
																<td>
																<span class="m_-7615546015233511716mb_text" style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823">
																	<p>Hola, ${data.usrNames} ${data.usrLastNames}:</p>
																	<p></p>
																	<div>Apreciado(a) <Nombre del cliente> Soluciones integrales 5-8 ha recibido una solicitud para usar <dirección de correo principal> como dirección de correo electrónico para tener acceso a nuestra aplicación, recibir notificaciones y reseteo de tus credenciales en caso de olvido. </div>
																	<br \>
																</span>
																	<div><strong>${empresa}</strong></div>
																	<table border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin-top:9px;margin-bottom:15px">
																		<tbody>
																			<tr>
																				<td style="font-size:11px;font-family:LucidaGrande,tahoma,verdana,arial,sans-serif;padding:10px;background-color:#f2f2f2;border-left:1px solid #ccc;border-right:1px solid #ccc;border-top:1px solid #ccc;border-bottom:1px solid #ccc">
																					<span class="m_-7615546015233511716mb_text" style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823">
																						Codigo de verificación: 
																					</span>
																				</td>
																				<td style="font-size:11px;font-family:LucidaGrande,tahoma,verdana,arial,sans-serif;padding:10px;background-color:#f2f2f2;border-left:1px solid #ccc;border-right:1px solid #ccc;border-top:1px solid #ccc;border-bottom:1px solid #ccc">
																					<span class="m_-7615546015233511716mb_text" style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823">
																						${codVerificacion}
																					</span>
																				</td>
																			</tr> 
																		</tbody>
																	</table>
																	<p></p>
																	<div>
																		<span style="color:#333333;font-weight:bold">Por favor digitar en la App.</span>
																	</div>
																</span>
																</td>
															</tr>
															<tr>
																<td height="28" style="line-height:28px">&nbsp;</td>
															</tr>
														</tbody>
													</table>
													</td>
													<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
												</tr>
												<tr>
													<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
													<td>
													<table border="0" width="100%" cellspacing="0" cellpadding="0" align="left" style="border-collapse:collapse">
														<tbody>
															<tr style="border-top:solid 1px #e5e5e5">
																<td height="19" style="line-height:19px">&nbsp;</td>
															</tr>
															<tr>
																<td style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:11px;color:#aaaaaa;line-height:16px">Este mensaje se envió a <a href="mailto:${data.usrEmail}" style="color:#3b5998;text-decoration:none" target="_blank">${data.usrEmail}</a>.<br>${empresa}
																</td>
															</tr>
														</tbody>
													</table>
													</td>
													<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
												</tr>
												<tr>
													<td height="20" style="line-height:20px" colspan="3">&nbsp;</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
			</div>
              `,
			})
			return { codVerificacion }
		} catch (e) {
			console.log(e)
			throw new Error('Error interno en el servidor')
		}
	},
	recoverypass: async (data) => {
		const codVerificacion = new Date().getMilliseconds()
		let transporter = nodemailer.createTransport(emailOutllook)
		const { usrEmail, usrEmailAlternative } = data
		await transporter.sendMail({
			from: `"${empresa}" ${from}`,
			to: `${usrEmail},${usrEmailAlternative}`,
			subject: `Código de recuperación de tu cuenta ${empresa}`,
			text: `Por favor registrar este codigo en la App para validar su correo electronico`,
			html: `
			<div style="margin:0;padding:0" dir="ltr" bgcolor="#ffffff">
				<table border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse:collapse">
					<tbody>
						<tr>
							<td style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;background:#ffffff">
								<table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
									<tbody>
										<tr>
											<td height="20" style="line-height:20px" colspan="3">&nbsp;</td>
										</tr>
										<tr>
											<td height="1" colspan="3" style="line-height:1px">
												<h1>Código para recuperación de tú password</h1>
												<span style="color:#ffffff;font-size:1px">&nbsp; Hola, ${data.usrNames} ${data.usrLastNames}: Recibimos una solicitud para restablecer tu contraseña de ${empresa}. Ingresa el siguiente código para restablecer la contraseña: ${codVerificacion} También puedes cambiar la contraseña directamente. &nbsp; Cambiar&nbsp;contraseña &nbsp; ¿No solicitaste este cambio? Si no solicitaste una nueva contraseña, avísanos . &nbsp;
												</span>
											</td>
										</tr>
										<tr>
											<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
											<td>
											<table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
												<tbody>
													<tr>
														<td height="15" style="line-height:15px" colspan="3">&nbsp;</td>
													</tr>
													<tr>
														<td width="100%" height="100%" align="left" valign="middle">
															<img src="${urlImg}" width="${width}" height="${heigthImg}" style="border:0">
														</td>
													</tr>
												</tbody>
											</table>
											</td>
											<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
										</tr>
										<tr>
											<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
											<td>
											<table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
												<tbody>
													<tr>
														<td height="28" style="line-height:28px">&nbsp;</td>
													</tr>
													<tr>
														<td>
														<span class="m_-7615546015233511716mb_text" style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823">
															<p>Hola, ${data.usrNames} ${data.usrLastNames}:</p>
															<p></p>
															<div>Recibimos una solicitud para restablecer tu contraseña de ${empresa}.</div>
															Ingresa el siguiente código para restablecer la contraseña:
															<table border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin-top:9px;margin-bottom:15px">
																<tbody>
																	<tr>
																	<td style="font-size:11px;font-family:LucidaGrande,tahoma,verdana,arial,sans-serif;padding:10px;background-color:#f2f2f2;border-left:1px solid #ccc;border-right:1px solid #ccc;border-top:1px solid #ccc;border-bottom:1px solid #ccc"><span class="m_-7615546015233511716mb_text" style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823">${codVerificacion}</span></td>
																	</tr>
																</tbody>
															</table>
															<p></p>
															<br>
															<!--<div>
																<span style="color:#333333;font-weight:bold">¿No solicitaste este cambio?</span>
															</div>-->
															<p>Este mensaje de carácter informativo se envió de forma automática a (${usrEmail}, ${usrEmailAlternative}) por Soluciones Integrales Cinco Ocho SAS.
																	Ésta es una notificación automática, por favor no responder a esta cuenta de correo toda vez que no está habilitado para recibir email.
															</p>
															Cordial saludo,
														</span>
														</td>
													</tr>
													<tr>
														<td height="28" style="line-height:28px">&nbsp;</td>
													</tr>
												</tbody>
											</table>
											</td>
											<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
										</tr>
										<tr>
											<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
											<td>
											<table border="0" width="100%" cellspacing="0" cellpadding="0" align="left" style="border-collapse:collapse">
												<tbody>
													<tr style="border-top:solid 1px #e5e5e5">
														<td height="19" style="line-height:19px">&nbsp;</td>
													</tr>
													<tr>
														<td style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:11px;color:#aaaaaa;line-height:16px">Este mensaje se envió a <a href="mailto:${data.usr_email}" style="color:#3b5998;text-decoration:none" target="_blank">${data.usrEmail}</a>.<br>${empresa}
														</td>
													</tr>
												</tbody>
											</table>
											</td>
											<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
										</tr>
										<tr>
											<td height="20" style="line-height:20px" colspan="3">&nbsp;</td>
										</tr>
									</tbody>
								</table>
								
							</td>
						</tr>
					</tbody>
				</table>
			</div>
            `,
		})
		const completeName = `${data.usrNames} ${data.usrLastNames}`
		return {
			codVerificacion,
			completeName: completeName,
			id: data.id,
			email: data.usrEmail,
		}
	},
	sendEmailSolicitudRealizadaDocuments: async (data, serviciosSolicitadosId, documentsTosSendMail) => {
		try {
			let attachments_ = []

			await Promise.all(
				documentsTosSendMail.map((file) => {
					const ruta = path.resolve(__dirname, `../../uploads/${file.documentsUrl}`)
					attachments_.push({
						filename: file.documentsName,
						path: ruta,
					})
				})
			)

			// await Promise.all(
			// 	filesToSendEmail.map((file) => {
			// 		console.log(file)
			// 		const ruta = path.resolve(__dirname, `../../uploads/${file.documentsUrl}`)
			// 		attachments_.push({
			// 			filename: file.documentsName,
			// 			path: ruta,
			// 		})
			// 	})
			// )

			const transporter = nodemailer.createTransport(emailOutllook)
			const { usrEmail, usrEmailAlternative, observation, usrUserName, serviceName, email } = data
			const resultado = await transporter.sendMail({
				from: `"${empresa}" <${from}>`,
				to: `${usrEmail},${usrEmailAlternative}, ${email}`,
				subject: `Confirmación Solicitud Nro. ${serviciosSolicitadosId} recibida – ${empresa}`,
				text: '',
				html: ` 
					<div style="margin:0;padding:0" dir="ltr" bgcolor="#ffffff">
						<table border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse:collapse">
							<tbody>
								<tr>
									<td style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;background:#ffffff">
										<table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
											<tbody>
												<tr>
													<td>
													<table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
														<tbody>
															<tr>
																<td height="28" style="line-height:28px">
																	<table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
																		<tbody>
																			<tr>
																				<td height="15" style="line-height:15px" colspan="3">&nbsp;</td>
																			</tr>
																			<tr>
																				<td width="100%" style="background:url(${urlImg}) no-repeat; height: ${heigthImg}; background-size: contain;text-align: center;">    
																					<span style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:19px;line-height:32px;color:white;">
																					</span>
																				</td>
																			</tr>
																			<tr style="border-bottom:solid 1px #e5e5e5">
																				<td height="15" style="line-height:15px" colspan="3">&nbsp;</td>
																			</tr>
																		</tbody>
																	</table>
																</td>
															</tr>
															<tr>
																<td>
																<span class="m_-7615546015233511716mb_text" style="width:100%;table-layout: fixed;
						overflow-wrap: break-word;font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823">
																	<p style="text-align:center;">
																		** Este es un correo electrónico generado por nuestro sistema de seguimiento de solicitudes jurídicas y de auxilios **
																	</p>
																	<p style="text-align:center;">
																		Por favor, no cambie el asunto del correo electrónico al responder a este mensaje
																	</p>
																	<br \>
																	<br \>
																	
																	<p>Apreciado(a) ${usrUserName}:</p>
																	<p>Gracias por ponerse en contacto con Soluciones Integrales Cinco Ocho S.A.S</p>
																	
																	<div style="max-width:100%: display:float;">
																		<div><h3>Detalles de la Solicitud: </h3></div>
																		
																		<div style="margin-top:15px;">
																			<div><strong>Nombre del solicitante:</strong></div> 
																			<div>${usrUserName}:</div>
																		<div/>
																		
																		<div style="margin-top:15px;">
																			<div><strong>Número de la solicitud:</strong></div> 
																			<div>#${serviciosSolicitadosId}</div>
																		<div>
																		
																		<div style="margin-top:15px;">
																			<div><strong>Tipo de solicitud: </strong></div> 
																			<div>${serviceName}</div>
																		<div>
																		
																		<div style="margin-top:15px;">
																			<div>
																				<strong>Descripción de la solicitud: </strong>
																			</div> 
																			<div>${observation}</div>
																		<div>
																	</div>
																	
																	<br \ >
																	<br \ >
																	<p>Por favor, haga referencia a este número de caso en todas las comunicaciones relacionadas con esta solicitud, mantenga siempre el mismo asunto del correo inicial.</p>
																	
																	<p>Estamos revisando su solicitud y nos comunicaremos con usted pronto.</p>
																</span>
																</td>
															</tr>
														</tbody>
													</table>
													</td>
												</tr>
												<tr>
													<td style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:11px;color:#aaaaaa;line-height:16px">Este mensaje se envió a <a href="mailto:${data.usrEmail}" style="color:#3b5998;text-decoration:none" target="_blank">${data.usrEmail}</a>.<br>${empresa}
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
      `,
				attachments: attachments_,
			})
		} catch (e) {
			console.log(e)
			throw new Error('Server error interno')
		}
	},
	sendEmailContrato: async (data, objectContratoPdf, groupNameService) => {
		const { usrEmail, usrEmailAlternative, usrNames, usrLastNames } = data
		try {
			let attachments_ = []

			const ruta = objectContratoPdf.urlContratoPdf
			attachments_.push({
				filename: objectContratoPdf.name,
				path: ruta,
			})

			const transporter = nodemailer.createTransport(emailOutllook)
			const resultado = await transporter.sendMail({
				from: `"${empresa}" "< ${from} >`,
				to: `${usrEmail},${usrEmailAlternative}, ${email}`,
				subject: `Bienvenido/a ${empresa}`,
				text: '',
				html: ` 
				<div>
					<table border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse; width:80%">
						<tbody>
							<tr>
								<td>
								<table border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse; width:100%">
									<tbody>
										<tr >
											<td width="100%" height="100%" align="left" valign="middle">
												<img src="${urlImg}" width="${width}" height="${heigthImg}" style="border:0">
											</td>
										</tr>
									</tbody>
								</table>
								</td>
							</tr>
							<tr>
								<td>
								<table border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse; width:100%">
									<tbody>
										<tr>
											<td>&nbsp;</td>
										</tr>
										<tr>
											<td>
												<h1>BIENVENIDO/A</h1>
												<p>${usrNames} ${usrLastNames}:</p>
												<p>Ya eres parte de ${empresa}</p>
												<p>Se ha generado un contrato para el <strong>${groupNameService}</strong> del cual adjuntamos tú copia digital. </p>
												<p style="align-text:justify">Ahora tienes acceso a los servicios del ${groupNameService} y todos los beneficios que te trae ${empresa} a través de nuestros diferentes medios de contacto.</p>
												<p style="align-text:center">Si tienes alguna duda por favor contáctanos por:</p>
												<p>
													<ul>
														<li><a href="${appMovilUrl}" target="_blank">
														Aplicativo móvil
														</a></li>
														<li>Página Web <a href="${sitioWeb}" target="_blank" >${sitioWeb}</a></li>
														<li>PBX: ${pbx}</li>
														<li>Correo electrónico: ${email}</li>
													</ul>
												</p>
												
												<p>Un cordial saludo.</p>
												<p>
													<strong>
														${empresa}
														<a href="${appWebUrl}" target="_blank">${appWebUrl}</a>
													</strong>
												</p>
												<p></p>
												<p></p>
												<p style="align-text:justify">Este mensaje de carácter informativo se envió de forma automática a ${usrEmail} por ${empresa}.</p>
												<p></p>
												<p></p>
												<p></p>
												<p></p>
												<small style="align-text:center; color:#a99d9d;">Ésta es una notificación automática, por favor no responder a esta cuenta de correo toda vez que no está habilitado para recibir email.</small>
											</td>
										</tr>
									</tbody>
								</table>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
      	`,
				attachments: attachments_,
			})
		} catch (e) {
			console.log(e)
			// log4js.error(`[action: email sendEmailTransaccionExitosa][msg: ${e.message}][file:${__filename}]`)
			throw new Error('Server error interno')
		}
	},
	emailNotificationEstateService: async (data) => {
		try {
			const codVerificacion = new Date().getMilliseconds()
			const transporter = nodemailer.createTransport(emailOutllook)
			const { usrEmail, usrEmailAlternative } = data
			const resultado = await transporter.sendMail({
				from: from,
				to: `${usrEmail},${usrEmailAlternative}`,
				subject: `Confirmación Solicitud Nro. <Número del requerimiento> recibida – ${empresa}`,
				text: '',
				html: `
							<div style="margin:0;padding:0" dir="ltr" bgcolor="#ffffff">
								<table border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse:collapse">
									<tbody>
										<tr>
											<td style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;background:#ffffff">
												<table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
													<tbody>
														<tr>
															<td height="20" style="line-height:20px" colspan="3">&nbsp;</td>
														</tr>
														<tr>
															<td height="1" colspan="3" style="line-height:1px">
																
															</td>
														</tr>
														<tr>
															<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
															<td>
															<table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
																<tbody>
																	<tr>
																		<td height="15" style="line-height:15px" colspan="3">&nbsp;</td>
																	</tr>
																	<tr>
																		<td width="100%" style="background:url(${urlImg}) no-repeat; height: ${heigthImg}; background-size: contain;text-align: center;">    
																			<span style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:19px;line-height:32px;color:white;">
																			</span>
																		</td>
																	</tr>
																	<tr style="border-bottom:solid 1px #e5e5e5">
																		<td height="15" style="line-height:15px" colspan="3">&nbsp;</td>
																	</tr>
																</tbody>
															</table>
															</td>
															<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
														</tr>
														<tr>
															<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
															<td>
															<table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
																<tbody>
																	<tr>
																		<td height="28" style="line-height:28px">
																			<table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
																				<tbody>
																					<tr>
																						<td height="15" style="line-height:15px" colspan="3">&nbsp;</td>
																					</tr>
																					<tr>
																						<td width="100%" style="background:url(${urlImg}) no-repeat; height: ${heigthImg}; background-size: contain;text-align: center;">    
																							<span style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:19px;line-height:32px;color:white;">
																							</span>
																						</td>
																					</tr>
																					<tr style="border-bottom:solid 1px #e5e5e5">
																						<td height="15" style="line-height:15px" colspan="3">&nbsp;</td>
																					</tr>
																				</tbody>
																			</table>
																		</td>
																	</tr>
																	<tr>
																		<td>
																		<span class="m_-7615546015233511716mb_text" style="width:100%;table-layout: fixed;
								overflow-wrap: break-word;font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823">
																			<p style="text-align:center;">
																				** Este es un correo electrónico generado por nuestro sistema de seguimiento de solicitudes jurídicas y de auxilios **
																			</p>
																			<p style="text-align:center;">
																				Por favor, no cambie el asunto del correo electrónico al responder a este mensaje
																			</p>
																			<br \>
																			
																			<p>Apreciado(a) ${data.usrNames} ${data.usrLastNames}:</p>
																			<p>Gracias por ponerse en contacto con Soluciones Integrales Cinco Ocho S.A.S.</p>
																			
																			<h3>Detalles de la Solicitud: </h3>
																			
																			<p>Nombre del solicitante: ${data.usrNames} ${data.usrLastNames}:</p>
																			
																			<p>Número de la solicitud: <Número asignado a la solicitud></p>
																			
																			<p>Tipo de solicitud: <Asistencia Jurídica | Asesoría Jurídica | Auxilio Exequial | Auxilio por suspensión o perdida laboral | Auxilio por maternidad></p>
																			
																			<p>Descripción de la solicitud: <Descriptivo de la solicitud realizada por el cliente></p>
																			
																			<p>Por favor, haga referencia a este número de caso en todas las comunicaciones relacionadas con esta solicitud, mantenga siempre el mismo asunto del correo inicial.</p>
																			
																			
																			<p>Estamos revisando su solicitud y nos comunicaremos con usted pronto.</p>
																			<br \>
																			<p>Soluciones Integrales Cinco Ocho SAS.</p>
																		</span>
																			
																		</span>
																		</td>
																	</tr>
																	<tr>
																		<td height="28" style="line-height:28px">&nbsp;</td>
																	</tr>
																</tbody>
															</table>
															</td>
															<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
														</tr>
														<tr>
															<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
															<td>
															<table border="0" width="100%" cellspacing="0" cellpadding="0" align="left" style="border-collapse:collapse">
																<tbody>
																	<tr style="border-top:solid 1px #e5e5e5">
																		<td height="19" style="line-height:19px">&nbsp;</td>
																	</tr>
																	<tr>
																		<td style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:11px;color:#aaaaaa;line-height:16px">Este mensaje se envió a <a href="mailto:${data.usrEmail}" style="color:#3b5998;text-decoration:none" target="_blank">${data.usrEmail}</a>.<br>${empresa}
																		</td>
																	</tr>
																</tbody>
															</table>
															</td>
															<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
														</tr>
														<tr>
															<td height="20" style="line-height:20px" colspan="3">&nbsp;</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
              `,
			})
			return { codVerificacion }
		} catch (e) {
			console.log(e)
			throw new Error('Error interno en el servidor')
		}
	},
	sendEmailRespuestaServicio: async (data) => {
		try {
			console.log(data)
			const transporter = nodemailer.createTransport(emailOutllook)
			const { usrEmail, usrEmailAlternative, id } = data
			const resultado = await transporter.sendMail({
				from: from,
				to: `${usrEmail},${usrEmailAlternative}`,
				subject: `Respuesta Solicitud de Servicio ${id} - ${empresa}`,
				text: '',
				html: ` <div style="margin:0;padding:0" dir="ltr" bgcolor="#ffffff">
									<table border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse:collapse">
										<tbody>
											<tr>
												<td style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;background:#ffffff">
													<table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
														<tbody>
															
															<tr>
																<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
																<td>
																<table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
																	<tbody>
																		<tr>
																			<td height="15" style="line-height:15px" colspan="3">&nbsp;</td>
																		</tr>
																		<tr>
																			<td width="100%" style="background:url(${urlImg}) no-repeat; height: ${heigthImg}; background-size: contain;text-align: center;">    
																				<span style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:19px;line-height:32px;color:white;">
																				</span>
																			</td>
																		</tr>
																		<tr style="border-bottom:solid 1px #e5e5e5">
																			<td height="15" style="line-height:15px" colspan="3">&nbsp;</td>
																		</tr>
																	</tbody>
																</table>
																</td>
																<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
															</tr>
															<tr>
																<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
																<td>
																<table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
																	<tbody>
																		<tr>
																			<td height="28" style="line-height:28px">&nbsp;</td>
																		</tr>
																		<tr>
																			<td>
																			<span class="m_-7615546015233511716mb_text" style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823">
																				<p>Hola, ${data.usrUserName}:</p>
																				<p></p>
																				<div>Nos permitimos informar que se ha agregado un comentario al servicio #${data.serviciosSolicitadosId} </div>
																				
																				<br \>
																				<h4>De: ${data.usernameCreate}</h4>

																				<p>${data.Comentario}</p>
																				<br \>
																			</span>
																			</span>
																			</td>
																		</tr>
																		<tr>
																			<td height="28" style="line-height:28px">&nbsp;</td>
																		</tr>
																	</tbody>
																</table>
																</td>
																<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
															</tr>
															<tr>
																<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
																<td>
																<table border="0" width="100%" cellspacing="0" cellpadding="0" align="left" style="border-collapse:collapse">
																	<tbody>
																		<tr style="border-top:solid 1px #e5e5e5">
																			<td height="19" style="line-height:19px">&nbsp;</td>
																		</tr>
																		<tr>
																			<td style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:11px;color:#aaaaaa;line-height:16px">Este mensaje se envió a <a href="mailto:${data.usrEmail}" style="color:#3b5998;text-decoration:none" target="_blank">${data.usrEmail}</a>.<br>${empresa}
																			</td>
																		</tr>
																	</tbody>
																</table>
																</td>
																<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
															</tr>
															<tr>
																<td height="20" style="line-height:20px" colspan="3">&nbsp;</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
						</div>
      `,
			})
		} catch (e) {
			console.log(e)
			throw new Error('Server error interno')
		}
	},
	sendmailEdicionContrato: async (data) => {
		try {
			const transporter = nodemailer.createTransport(emailOutllook)
			const { usrEmail, usrEmailAlternative } = data.usuario
			const { nroContrato } = data.contrato
			const resultado = await transporter.sendMail({
				from: from,
				to: `${usrEmail},${usrEmailAlternative}`,
				subject: `Actualización de contrato #${nroContrato} - ${empresa}`,
				text: '',
				html: `
						<div style="margin:0;padding:0 ;width: 100%;" dir="ltr" >
						<table border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse:collapse;width: 100%;">
							<tbody>
								<tr>
									<td style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;background:#ffffff">
										<table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
											<tbody>
												
												<tr>
													<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
													<td>
													<table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
														<tbody>
															<tr>
																<td height="15" style="line-height:15px" colspan="3">&nbsp;</td>
															</tr>
															<tr>
																<td width="100%" height="100%" align="left" valign="middle">
																	<img src="${urlImg}" width="${width}" height="${heigthImg}" style="border:0">
																</td>
															</tr>
															<tr style="border-bottom:solid 1px #e5e5e5">
																<td height="15" style="line-height:15px" colspan="3">&nbsp;</td>
															</tr>
														</tbody>
													</table>
													</td>
													<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
												</tr>
												<tr>
													<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
													<td>
													<table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;width: 100%;">
														<tbody>
															<tr>
																<td height="28" style="line-height:28px">&nbsp;</td>
															</tr>
															<tr>
																<td>
																<p style="text-align:center;">
																		** Este es un correo electrónico generado por nuestro sistema de seguimiento de solicitudes jurídicas y de auxilios **
																	</p>
																	<p style="text-align:center;">
																		Por favor, no cambie el asunto del correo electrónico al responder a este mensaje
																	</p>
																	<br \>
																<span class="m_-7615546015233511716mb_text" style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823">
																	<p style="text-align:center;">Hola, <strong>${data.usuario.nombre} ${data.usuario.apellido}</strong>:</p>
																	<p></p>
																	<div style="text-align:center;">Nos permitimos informar que se ha actualizado el <strong>contrato #${
																		data.contrato.nroContrato
																	} </strong>
																	</div>
												
																<h2 style="background-color: #f0f0f0;padding: 15px; border: 2px solid #000;text-align: center;">Datos Usuario</h2>					
															<div >
																	<div>
																		<p><strong>Nombre:</strong> ${data.usuario.nombre}</p>
																		</div>
																		<div>
																		<p><strong>Apellido:</strong> ${data.usuario.apellido}</p>
					
																		</div>
																		<div>
																		<p><strong>Tipo usuario:</strong> ${data.usuario.tipoUsuario}</p>
																		</div>

																		<div>
																		<p><strong>Email:</strong> ${data.usuario.usrEmail}</p>
																		</div>

																		<div>
																		<p><strong>Email alternativo:</strong> ${data.usuario.usrEmailAlternative}</p>
																		</div>
																		
																		<div>
																		<p><strong>T.I:</strong>  ${data.usuario.tipoCedula}</p>
					
																		</div>
																		<div>
																		<p><strong>Cedula:</strong> ${data.usuario.cedula}</p>
					
																		</div>
																		<div>
																		<p><strong>Nro. Celular:</strong> ${data.usuario.celular}</p>
					
																		</div>
																	</div>
																	<h2 style="background-color: #f0f0f0;padding: 15px; border: 2px solid #000;text-align: center;">Datos Contrato</h2>

																	<div >
																		<div>
																			<p><strong>Fecha Nacimiento:</strong> ${data.contrato.fechaNac}</p>
																		</div>

																		<div>
																		<p><strong>Estado Civil:</strong> ${data.contrato.estadoCivilNombre}</p>
																		</div>

																		<div>
																			<p><strong>Ciudad:</strong> ${data.contrato.nombreCiudad}</p>
																		</div>

																		<div>
																			<p><strong>Dirección:</strong> ${data.contrato.direccion}</p>
																		</div>

																		<div>
																			<p><strong>Referido o Código de su Asesor Comercial:</strong> ${data.contrato.referido}</p>
																		</div>

																		<div>
																			<p><strong>Pago por Nomina:</strong> ${data.contrato.nomina ? 'SI' : 'NO'}</p>
																		</div>

																		<div>
																			${data.contrato.nomina ? `<p><strong>Pin:</strong>  ${data.contrato.pin}</p>` : ''}  
																		</div>

																	${beneficiarios(data.contrato.beneficiario, data.contrato.parentescoArray, 'BENEFICIARIOS AUXILIO EXEQUIAL')}
          												${beneficiarios(
																		data.contrato.beneficiarioJuridico,
																		data.contrato.parentescoArray,
																		'BENEFICIARIOS SERVICIO JURIDICO'
																	)}
																	</div>
																	<br \>
																</span>
																</span>
																</td>
															</tr>
															<tr>
																<td height="28" style="line-height:28px">&nbsp;</td>
															</tr>
														</tbody>
													</table>
													</td>
													<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
												</tr>
												<tr>
													<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
													<td>
													<table border="0" width="100%" cellspacing="0" cellpadding="0" align="left" style="border-collapse:collapse">
														<tbody>
															<tr style="border-top:solid 1px #e5e5e5">
																<td height="19" style="line-height:19px">&nbsp;</td>
															</tr>
															<tr>
																<td style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:11px;color:#aaaaaa;line-height:16px">Este mensaje se envió a <a href="mailto:${
																	data.usuario.usrEmail
																}" style="color:#3b5998;text-decoration:none" target="_blank">${
					data.usuario.usrEmail
				}</a>.<br>${empresa}
																</td>
															</tr>
														</tbody>
													</table>
													</td>
													<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
												</tr>
												<tr>
													<td height="20" style="line-height:20px" colspan="3">&nbsp;</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
      `,
			})
		} catch (e) {
			console.log(e)
			throw new Error('Server error interno')
		}
	},
}

function beneficiarios(beneficiarios, parentescos, cabecera) {
	let ben = ''
	if (beneficiarios.length !== 0) {
		ben = `
			<table colspan="3" style="width:100%; margin-top: 15px;border: 1px solid black;">
				<thead>
					<caption style="border: 1px solid black;padding:5px;background-color: #f0f0f0;"><strong>${cabecera}</strong></caption>
					<tr>
						<th>PARENTESCO</th>
						<th style="text-align: center">NOMBRES Y APELLIDOS</th>
						<th style="text-align: center; vertical-align: middle">EDAD</th>
					</tr>
				</thead>
				<tbody>
    `
		const parentescoArray = JSON.parse(parentescos)
		beneficiarios.map(async (beneficiario) => {
			let parentesto = findParentescoText(beneficiario.parentesco, parentescoArray)
			ben += `
					<tr >
						<td style="width:40%;text-align: center; vertical-align: middle;border: 1px solid black;">${parentesto}</td>
						<td style="width:40%;text-align: center; vertical-align: middle;border: 1px solid black;">${beneficiario.nombreCompleto}</td>
						<td style="width:20%;text-align: center; vertical-align: middle;border: 1px solid black;">${beneficiario.edad}</td>
					</tr>
      `
		})
		ben += `
				</tbody>
			</table>`
	}

	return ben
}

function findParentescoText(id, parentescoArray) {
	let _parentesco

	_parentesco = parentescoArray.find((parentesco) => parseInt(parentesco.id, 10) === parseInt(id, 10))
	return _parentesco.description
}
