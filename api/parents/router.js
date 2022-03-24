const router = require('express').Router()
const Controller = require('./index')
const response = require('../../utils/response')

const jwt = require('../middlewares/jwt')
// const schema = require('../../db/schemas/user.json')
// const Schema = require('../middlewares/schema')(schema)

router.get('/parents', [jwt.isAuth], async (req, res, next) => {
	Controller.getAll(req, res)
		.then((resp) => response.success(req, res, resp.msg, resp.status))
		.catch(next)
})

module.exports = router
