const sqlPool = require('./connection-pool-mssql')
const { pool1Connect, pool } = sqlPool.createPool()
const { NODE_ENV } = process.env

//const Message = require('./../utils/messages/message')()
const log4js = require('../utils/log4js')()
require('dotenv').config()

const Execute = (sql, params = []) => {
	if (NODE_ENV !== 'production') {
		consoleQuery(sql, params)
	}

	return new Promise(async (resolve, reject) => {
		try {
			//const pool = await sqlPool.createPool()
			await pool1Connect
			const request = pool.request()

			request
				.query(sql)
				.then((result) => {
					resolve(result)
				})
				.catch((e) => {
					reject(e)
				})
		} catch (e) {
			// console.log(error.message)
			log4js.error(`[action: execute Execute][msg: ${JSON.stringify(e)}][file:${__filename}]`)
			reject(e)
		}
	})
}

/**
 * Ejecutamos los Querys con validacion de Inyección Sql
 * @param {*} sql = query
 * @param {*} params = parametros
 */
const ExecuteInyect = (sql, params = []) => {
	if (NODE_ENV !== 'production') {
		consoleQuery(sql, params)
	}
	return new Promise(async (resolve, reject) => {
		try {
			//const pool = await sqlPool.createPool()
			await pool1Connect
			const request = pool.request()

			params.map((object) => {
				for (const property in object) request.input(property, object[property])
			})

			request
				.query(sql)
				.then((result) => {
					resolve(result)
				})
				.catch((e) => {
					reject(e)
				})
		} catch (e) {
			// console.log(e)
			log4js.error(`[action: execute ExecuteInyect][msg: ${JSON.stringify(e)}][file:${__filename}]`)
			reject(e)
		}
	})
}

/**
 * Ejecutamos SP
 * @param {*} params = parametros a enviar
 */
const ExecuteInyectStoreProcedure = (sql, params = []) => {
	if (NODE_ENV !== 'production') {
		consoleQuery(sql, params)
	}
	return new Promise(async (resolve, reject) => {
		try {
			//const pool = await sqlPool.createPool()
			await pool1Connect
			const request = pool.request()

			if (params.length > 0) {
				params.map((object) => {
					for (const property in object) request.input(property, object[property])
				})
			}

			request
				.execute(sql)
				.then((result) => {
					resolve(result)
				})
				.catch((e) => {
					reject(e)
				})
		} catch (e) {
			log4js.error(`[action: execute ExecuteInyectStoreProcedure][msg: ${JSON.stringify(e)}][file:${__filename}]`)
			reject(e)
		}
	})
}

/**
 * Mostramos query por consola
 * @param {*} nameSp Query o Sp
 * @param {*} params parametros
 */
function consoleQuery(nameSp, params) {
	console.log(nameSp)
	console.log(params)
}

module.exports = {
	Execute,
	ExecuteInyect,
	ExecuteInyectStoreProcedure,
}
