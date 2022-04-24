const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
require('dotenv').config()
const { PORT } = require('./configs/config')
const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

const tasksRoutes = require('./routes/tasks')
app.use('/tasks', tasksRoutes)

const mongodb = require('./configs/database')
mongodb.connect()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}

app.listen(PORT, () => console.log("Server is running on port: " + PORT))

