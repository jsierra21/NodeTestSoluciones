const Queries = require('./../db/queries')
const mensajes = require('./../utils/messages')
const log4js = require('./../utils/log4js')()

const create = async (data) => {
	const query = `
      INSERT INTO [dbo].[users]
           ([usrEmail]
           ,[usrEmailAlternative]
           ,[usrPassword]
           ,[usrNames]
           ,[usrLastNames]
           ,[identificationTypeId]
           ,[userTypesId]
           ,[usrCedula]
           ,[usrNroCelular]
           ,[usrStatus]
           ,[lastLogin]
           ,[profileId]
           ,[hasGeolocation]
           ,[usrLat]
           ,[usrLng]
           ,[usrTerminosCondiciones]
           ,[lastDateLogin]
           ,[createdAt]
           ,[updatedAt])
    VALUES
           (@usrEmail
           ,@usrEmailAlternative
           ,@usrPassword
           ,@usrNames
           ,@usrLastNames
           ,@identificationTypeId
           ,@userTypesId
           ,@usrCedula
           ,@nroCelular
           ,1
           ,GETDATE()
           ,1
           ,@hasGeolocation
           ,@usrLat
           ,@usrLng
           ,@usrTerminosCondiciones
           ,GETDATE()
           ,GETDATE()
           ,GETDATE()
           )
    `
	const {
		usrEmail,
		usrEmailAlternative,
		usrPassword,
		usrNames,
		usrLastNames,
		identificationTypeId,
		userTypesId,
		usrCedula,
		usrNroCelular,
		hasGeolocation,
		usrLat,
		usrLng,
		usrTerminosCondiciones,
	} = data
	const nroCelular = usrNroCelular.toString()
	return await Queries.queryInject(query, [
		{
			usrEmail,
			usrEmailAlternative,
			usrPassword,
			usrNames,
			usrLastNames,
			identificationTypeId,
			userTypesId,
			usrCedula,
			nroCelular,
			hasGeolocation,
			usrLat,
			usrLng,
			usrTerminosCondiciones,
		},
	])
}

const countOne = async (id) => {
	try {
		const query = `
            SELECT [id]
                ,[usrEmail]
                ,[usrPassword]
                ,[usrNames]
                ,[usrLastNames]
                ,[identificationTypeId]
                ,[userTypesId]
                ,[usrCedula]
                ,[usrNroCelular]
                ,[usrTelefonoFijo]
                ,[usrDireccion]
                ,[usrStatus]
                ,[lastLogin]
                ,[profileId]
                ,[usrLat]
                ,[usrLng]
            FROM [dbo].[users] (nolock)
            WHERE id = @id
        `
		const { recordset } = await Queries.queryInject(query, [{ id }])
		return recordset
	} catch (e) {
		log4js.error(`[action: user.mssql countOne][msg: ${e.message}][file:${__filename}]`)
		throw new Error('Server error interno')
	}
}

const FindOneUser = async (id) => {
	try {
		const query = `
            SELECT TOP(1) [id]
                ,[usrEmail]
                ,[usrEmailAlternative]
                ,[usrNames]
                ,[usrLastNames]
                ,[usrCedula]
                ,[usrNroCelular]
                ,[usrTelefonoFijo]
                ,[usrDireccion]
                ,[hasGeolocation]
                ,[usrLat]
                ,[usrlng]
            FROM [dbo].[users] (nolock)
            WHERE id = @id
        `
		const { recordset } = await Queries.queryInject(query, [{ id }])
		return recordset
	} catch (e) {
		log4js.error(`[action: user.mssql FindOne][msg: ${e.message}][file:${__filename}]`)
		throw new Error('Server error interno')
	}
}

const update = async (id, data) => {
	const query = `
      UPDATE [dbo].[users]
      SET 
           [usrNameComplete] = '${data.usr_nameComplete}'
          ,[usrNroCelular] = '${data.usr_nroCelular}'
          ,[usrTelefonoFijo] = '${data.usr_telefonoFijo}'
          ,[usrDireccion] = '${data.usr_direccion}',
          ,[updatedAt] = GETDATE()
    WHERE id = ${id}
    `
	return await Queries.query(query)
}

const updatePass = async (id, usrPassword) => {
	const query = `
      UPDATE [dbo].[users]
      SET 
        [usrPassword] = '${usrPassword}'
        ,[updatedAt] = GETDATE()
    WHERE id = ${id}
    `
	return await Queries.query(query)
}

const sPFindUserMail = async (data) => {
	try {
		const { usrCedula, usrEmail } = data
		return await Queries.querySP('[aut].[spFindOne]', [{ usrCedula, usrEmail }])
	} catch (e) {
		log4js.error(`[action: user.mssql FindOne][msg: ${e.message}][file:${__filename}]`)
		throw new Error('Server error interno')
	}
}

module.exports = {
	create,
	countOne,
	FindOneUser,
	update,
	updatePass,
	sPFindUserMail,
}
