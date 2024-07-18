const express = require('express')
const app = express()
const port = 3000
const routes = require('./router')
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'dickyganteng',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(routes)

app.listen(port, () => {
  console.log(`cuma ${port}, miskin!!!!`)
})