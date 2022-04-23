const Task = require('../models/tasks')

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find(); 
        res.json(tasks)
    } catch (err) {
        req.json({message: err})
    }
}

const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        res.json(task)
     } catch (err) {
         req.json({message: err})
     }
}

const createTask = async (req, res) => {
    const task = new Task({
        title: req.body.title,
        date: req.body.date,
        completed: req.body.completed
    })
    try {
        const savedTask = await task.save()
        res.json(savedTask)
    } catch (err) {
        req.json({message: err})
    }
}

const updateTask = async (req, res) => {
    try {
        const task = await Task.updateOne(
            {_id: req.params.id}, 
            {$set: {
             completed: req.body.completed, 
                title: req.body.title, 
                date: req.body.date}
             })
        res.json(task)
     } catch (err) {
         res.json({message: err})
     }
}

const deleteTask = async (req, res) => {
    try {
        const taskdeleted = await Task.remove({_id: req.params.id})
        res.json(taskdeleted)
    } catch (err) {
        req.json({message: err})
    }
}

module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}