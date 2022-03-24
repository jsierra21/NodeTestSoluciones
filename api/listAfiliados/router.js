const express = require('express')
const router = express.Router()
const response = require('./../../utils/response')
const Controller = require('./index')

const jwt = require('./../middlewares/jwt')

router.get('/listAfiliados', [jwt.isAuth], (req, res, next) => {
	Controller.getListAfiliados(req, res)
		.then((resp) => response.success(req, res, resp.msg, resp.status))
		.catch(next)
})

module.exports = router
