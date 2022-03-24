'use strict'
/**
 * @name Auth
 * @type function
 * @description Función encargada de realizar la consulta con mssql
 * @author Alfonso Navarro <alfonso.navarron@syspotec.com>
 */

const Queries = require('./../db/queries')

const findOne = async (user) => {
	const query = `
      SELECT TOP(1)
        u.id,
        u.usrEmail,
        u.usrPassword,
        u.usrNames,
        u.usrLastNames,
        u.identificationTypeId,
        u.userTypesId,
        u.usrCedula,
        u.usrNroCelular,
        profileId,
        ut.pin,
        ut.redirigirAPagoOnline,
        u.usrEmailAlternative
      FROM [dbo].[users] u (nolock)
      INNER JOIN [dbo].[profiles] p ON u.profileId = p.id
      INNER JOIN [dbo].[userTypes] ut ON u.userTypesId = ut.id
      WHERE 
        usrEmail = @user 
      AND 
        u.usrStatus = 1
    `
	return await Queries.queryInject(query, [{ user }])
}

const findOneAdmin = async (user) => {
	const query = `
      SELECT TOP(1)
        u.id,
        u.usrEmail,
        u.usrPassword,
        u.usrNames,
        u.usrLastNames,
        u.identificationTypeId,
        u.userTypesId,
        u.usrCedula,
        u.usrNroCelular,
        profileId,
        ut.pin,
        ut.redirigirAPagoOnline,
        u.usrEmailAlternative
      FROM [dbo].[users] u (nolock)
      INNER JOIN [dbo].[profiles] p ON u.profileId = p.id
      INNER JOIN [dbo].[userTypes] ut ON u.userTypesId = ut.id
      WHERE 
        usrEmail = @user 
      AND 
        u.usrStatus = 1
      AND
        u.portalAdministrivo = 1
    `
	return await Queries.queryInject(query, [{ user }])
}

const update = async (id) => {
	const query = `
    UPDATE [dbo].[users]
    SET lastLogin = GETDATE()
    WHERE id = @id
  `
	return await Queries.queryInject(query, [{ id }])
}

module.exports = {
	findOne,
	findOneAdmin,
	update,
}
