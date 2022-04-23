const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const port = 3000

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

const tasksRoutes = require('./routes/tasks')
app.use('/tasks', tasksRoutes)

app.get('/', function (req, res) {
    res.json('Home')
})

const mongodb = require('./configs/database')
mongodb.connect()

app.listen(port, () => console.log("Server is running on port: " + port))

