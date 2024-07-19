const { Profile, User, Disease, Symptom, SymptomToDisease } = require('../models/index')
const { Op } = require("sequelize")
const Helper = require('../helper/helper')
class Controller {
  static async ShowDisiase(req, res) {
    try {
      const disease = await Disease.findAll()
      // console.log(disease);
      res.render("homePage.ejs", { disease })
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
        // console.log(symptoms);

      })
      const symptomsJson = symptoms.map(el => el.dataValues.Symptom.dataValues)
      res.render('detail.ejs', { symptoms: symptomsJson, disease })
      // console.log(symptoms);
    } catch (error) {
      res.send(error)
    }
  }

  static async adminAddFormDisease(req, res) {
    try {
      const symptoms = await Symptom.findAll()
      res.render('addFormPenyakit.ejs', { symptoms })

    } catch (error) {
      res.send(error)
    }
  }

  static async adminAddDisease(req, res) {
    try {
      const { name, description, level, SymptomId } = req.body
      await Disease.create(name, description, level, SymptomId)
      res.redirect("/admin/disease")
    } catch (error) {
      res.send(error)
    }
  }

  static async adminDisease(req, res) {
    try {
      const disease = await Disease.findAll()
      res.render("adminHome.ejs", { disease })
    } catch (error) {
      res.send(error)
    }
  }

  static async adminEditformDisease(req, res) {
    try {
      const { id } = req.params
      const symptoms = await Symptom.findAll()
      const disease = await Disease.findOne({
        where: { id: id }
      })
      res.render("adminEditForm.ejs", { symptoms, disease })
    } catch (error) {
      res.send(error)
    }
  }

  static async adminEditDisease(req, res) {
    try {
      const { id } = req.params
      const { name, description, level, SymptomId } = req.body
      await Disease.update({ name, description, level, SymptomId },
        { where: { id } }
      )
      res.redirect("/admin/disease")
    } catch (error) {
      res.send(error)
    }
  }

  static async AdminDeleteDisease(req, res) {
    try {
      const { id } = req.params
      await Disease.destroy({
        where: { id }
      })
      res.redirect("/admin/disease")
    } catch (error) {
      res.send(error)
    }
  }

  static async showProfile(req, res) {
    try {
      const { id } = req.params
      const profile = await Profile.findOne(id)
      // console.log(profile, 'ini profile');
      res.render("profile.ejs", { profile: [profile], Helper })
    } catch (error) {
      res.send(error)
    }
  }

  static async register(req, res) {
    try {
      const { firstName, lastName, dateOfBirth, gender, email, password } = req.body
      // console.log(req.body);
      const hashedPassword = await Helper.hashPassword(password)
      const user = await User.create({ email, password: hashedPassword })
      await Profile.create({ firstName, lastName, dateOfBirth, gender, UserId: user.id })
      res.redirect("/login")
      // console.log(user);
    } catch (error) {
      res.send(error)
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email
        }
      })
      // console.log(user, 'userrrrr');
      const { id, email: emailFromDb, password: passwordFromDb, role } = user.dataValues;
      const isMatch = await Helper.comparePassword(password, passwordFromDb)
      if (isMatch) {
        req.session.user = {
          id: id,
          email: emailFromDb,
          role: role
        }
        if (role === 'admin') {
          res.redirect('/admin/disease')
        } else {
          res.redirect('/disease')
        }
      } else {
        res.send('Password salah')
      }
    } catch (error) {
      res.send(error)
    }
  }

  static async loginForm(req, res) {
    try {
      res.render("login.ejs")
    } catch (error) {
      res.send(error)
    }
  }
  static async registerForm(req, res) {
    try {
      res.render("register.ejs")
    } catch (error) {
      res.send(error)
    }
  }

  static async logout(req, res) {
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