const Queries = require('./../db/queries')

const saveLogs = async (message) => {
	return await Queries.querySP('[log].[SaveLog]', [{ message }])
}

const consultLog = async (userId) => {
	const query = `
      SELECT *
      FROM [log].[log_error] l (nolock)		
    `
	return await Queries.query(query)
}

const deleteLogs = async (userId) => {
	const query = `
      SELECT *
      FROM [log].[log_error] l (nolock)		
    `
	return await Queries.query(query)
}

module.exports = {
	saveLogs,
	consultLog,
	deleteLogs,
}
