const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes/routes')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.use(routes)

app.listen(port, () => {
  console.log(`cuma ${port}, miskin!!!!`)
})