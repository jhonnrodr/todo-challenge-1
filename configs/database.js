
const mongoose = require('mongoose')

const database = {
     connect() {
        mongoose.connect('mongodb+srv://jhonn:musica@cluster0.9upig.mongodb.net/todo?retryWrites=true&w=majority',
        { useNewUrlParser: true }, 
        () => {
            console.log('Connected to database')
        })
    }
}

module.exports = database