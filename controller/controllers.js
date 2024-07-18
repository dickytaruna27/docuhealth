const {doketer, user, disease, symptom} = require('../models/index')
const {Op} = require ("sequelize")
const Helper = require('../helper/helper')
class Controller{
  static async addShowSympton(req,res){
    try {
      const symptoms =  await symptom.findAll()
      res.render("symptoms", {symptoms})
    } catch (error) {
      res.send(error)
    }
  }

  static async
}

module.exports = Controller