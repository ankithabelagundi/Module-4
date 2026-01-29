const express = require('express')
const userRoutes = require('./routes/user.routes')
const todoRoutes = require('./routes/todo.routes')

const app = express()

app.use(express.json())

app.use('/users', userRoutes)
app.use('/todos', todoRoutes)

module.exports = app
