const express = require('express')
const router = express.Router()
const Controller = require('./index')

const response = require('./../../utils/response')

const schema = require('./../../db/schemas/user.json')
const Schema = require('./../middlewares/schema')(schema)
const jwt = require('./../middlewares/jwt')
router
    .post('/Error',[jwt.isAuth] , (req, res, next) => {
		
		Controller.postError(req, res)
			.then((lista) => response.success(req, res, lista, 200, 'created'))
			.catch(next)
	})	
	
	
	

module.exports = router