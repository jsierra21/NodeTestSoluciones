const Queries = require('./../db/queries')
const log4js = require('./../utils/log4js')()

const getListAfiliados = async () => {
	const query = `
      SELECT 
        ua.[id]
        ,ua.[typeDocumento]
        ,ua.[nroDocumento]
        ,ua.[nroContrato]
        ,ua.[fechaContrato]
        ,ua.[nroInterno]
        ,ua.[estadoString]
        ,ua.[tipo]
        ,ua.[inicioSercvicio]
        ,ua.[bajaServicio]
        ,ua.[valorServicio]
        ,ua.[desconocido11]
        ,ua.[token]
        ,ua.[estado]
        ,ua.[createdAt]
        ,ua.[userIdCreatedAt]
        ,CONCAT(u.usrNames, ' ',u.usrLastNames) UsuarioCrea
        ,ua.[updatedAt]
        ,ua.[userIdUpdatedAt]
        ,CONCAT(usa.usrNames, ' ',usa.usrLastNames) UsuarioActualiza
      FROM 
        [afi].[userAfiliados] ua (nolock)
      INNER JOIN [dbo].users u 
        ON ua.userIdCreatedAt = u.id
      LEFT JOIN [dbo].users usa 
        ON ua.userIdUpdatedAt = usa.id
  `
	return await Queries.query(query)
}

module.exports = {
	getListAfiliados,
}
