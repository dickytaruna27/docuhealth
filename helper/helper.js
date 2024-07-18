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
}

module.exports= Helper