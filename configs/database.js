
const mongoose = require('mongoose')

const database = {
     connect() {
        mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true }, 
        () => {
            console.log('Connected to database')
        })
    }
}

module.exports = database