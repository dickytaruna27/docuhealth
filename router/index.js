const router = require('express').Router()
const Controller = require('../controller/controllers')

router.get('/regis')
router.get('/login')
router.get('/home')
router.get('/home/:id/')
router.get('/home/add', Controller.addFormConsul)


module.exports = router