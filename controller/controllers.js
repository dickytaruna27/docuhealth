const { Profile, User, Disease, Symptom, SymptomToDisease } = require('../models/index')
const { Op } = require("sequelize")
const Helper = require('../helper/helper')
class Controller {
  static async ShowDisiase(req, res) {
    try {
      console.log('show disease');
      const disease = await Disease.findAll()
      res.render("disease", { disease })
    } catch (error) {
      res.send(error)
    }
  }

  static async detailDisease(req, res) {
    try {
      const { id } = req.params
      const disease = await Disease.findOne({
        where: {
          id: id
        },
      })
      const symptoms = await SymptomToDisease.findAll({
        where: {
          DiseaseId: id
        },
        include: {
          model: Symptom,
        }

      })
      res.render('diseaseDetail', { symptoms, disease })
      // console.log(symptoms);
    } catch (error) {
      res.send(error)
    }
  }

  static async adminAddFormDisease(req, res) {
    try {
      const symptoms = await Symptom.findAll()
      res.render('addFormDisease', { symptoms })

    } catch (error) {
      res.send(error)
    }
  }

  static async adminAddDisease(req, res){
    try {
      const {name, description,level, SymptomId} =req.body
      await Disease.create(name, description,level, SymptomId)
      res.redirect("/admin/disease")
    } catch (error) {
      res.send(error)
    }
  }

  static async adminDisease (req, res){
      try {
        const disease = await Disease.findAll()
        res.render("adminDisease", { disease })
      } catch (error) {
        res.send(error)
      }
    } 

    static async adminEditformDisease(req,res){
      try {
        const{id} = req.params
        const symptoms = await Symptom.findAll()
        const disease = Disease.findOne({
          where:{id:id}
        })
        res.render("adminEditForm", {symptoms, disease})
      } catch (error) {
        res.send(error)
      }
    }

    static async adminEditDisease(req,res){
      try {
        const {id} =req.params
        const { name, description,level, SymptomId } =req.body
        await Disease.update({name, description,level, SymptomId},
          {where:{id}}
        )
        res.redirect("/admin/disease")
      } catch (error) {
        res.send(error)
      }
    }
    static async AdminDeleteDisease(req,res){
      try {
        const {id} = req.params
        await Disease.destroy({
          where:{id}
        })
        res.redirect("/admin/disease")
      } catch (error) {
        res.send(error)
      }
    }

    static async showProfile(req,res){
      try {
        const profile = await Profile.findOne()
        res.render("profile", {profile})
      } catch (error) {
        res.send(error)
      }
    }

    static async register(req,res){
      try {
        const {firstName, lastName, dateOfBirth,gender, email, password } =req.body
        const hashedPassword = Helper.hashPassword(password)
        const user = await User.create({ email, password: hashedPassword})
        await Profile.create({firstName, lastName, dateOfBirth,gender, UserId: user.id})
        console.log(user);
      } catch (error) {
        res.send(error)
      }
    }

    static async login(req,res){
      try {
        const {email, password} = req.body
        const user = await User.findOne({
          where: {
            email
          }
        })
        const isMatch = await Helper.comparePassword(password, user.password)
        if (isMatch) {
          req.session.user = {
            id: user.id,
            email: user.email,
            role: user.role
          }
          if (user.role === 'admin') {
            res.redirect('/admin/disease')
          } else {
            res.redirect('/disease')
          }
        }
      } catch (error) {
        res.send(error)
      }
    }

    static async loginForm(req,res){
      try {
        res.render("loginForm")
      } catch (error) {
        res.send(error)
      }
    }
    static async registerForm(req,res){
      try {
        res.render("registerForm")
      } catch (error) {
        res.send(error)
      }
    }

    static async logout(req,res){
      try {
        req.session.destroy(() => {
          res.redirect('/login')
        });
      } catch (error) {
        res.send(error)
      }
    }

}
module.exports = Controller