const router = require('express').Router()
const Controller = require('../controller/controllers')
const Helper = require('../helper/helper');

router.get("/register", Controller.registerForm)
router.post('/register', Controller.register)
router.get("/login", Controller.loginForm)
router.post('/login', Controller.login)
router.get('/disease', Helper.requireAuth, Controller.ShowDisiase)
router.get('/disease/:id', Helper.requireAuth, Controller.detailDisease)
router.get("/profile", Helper.requireAuth, Controller.showProfile)
router.get('/logout', Controller.logout)

// admin
router.get('/admin/disease', Helper.requireAdminRole, Controller.adminDisease),
  router.get('/admin/diseases/add', Helper.requireAdminRole, Controller.adminAddFormDisease),
  router.post('/admin/diseases/add', Helper.requireAdminRole, Controller.adminAddDisease),
  router.get('/admin/diseases/:id/edit', Helper.requireAdminRole, Controller.adminEditformDisease),
  router.post('/admin/diseases/:id/edit', Helper.requireAdminRole, Controller.adminEditDisease),
  router.post('/admin/diseases/:id/delete', Helper.requireAdminRole, Controller.AdminDeleteDisease),


  module.exports = router