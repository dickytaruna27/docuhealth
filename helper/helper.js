const bcrypt = require('bcryptjs');

class Helper{
  static getAge(dateOfBirth){
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const gapMonth = today.getMonth() - birthDate.getMonth()
    const gapDay = today.getDate() - birthDate.getDate()

    if (gapMonth < 0 || (gapMonth === 0 && gapDay < 0)) {
      age--
    }
    return age
  }

  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
  }

  static async comparePassword(password, hashedPassword) {
    const match = await bcrypt.compare(password, hashedPassword)
    return match
  }

  static requireAuth(req, res, next) {
    if (req.session.user) {
      next()
    } else {
      res.redirect('/login')
    }
  }

  static requireAdminRole(req, res, next) {
    // req.session.user = {
    //   id: 1,
    //   email: 'athuf@gmail.com',
    //   role: 'user'
    // }
    const user = req.session.user;
    if (user) {
      if (user.role === 'admin') {
        next();
      } else {
        res.redirect('/disease')
      }
    } else {
      res.redirect('/login')
    }
  }
}

module.exports= Helper