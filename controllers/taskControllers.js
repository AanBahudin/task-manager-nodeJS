const Task = require('../models/TaskSchema')
const asyncWrapper = require('../middleware/asyncWrapper')


const getTask = async (req, res) => {
    try {
        // find all items
        const tasks = await Task.find({});
        res.status(200).json({tasks})
    } catch (error) {
        return res.status(404).json({error: true, msg: error})
    }
}

const createTasks = async (req, res) => {
    try {
        const task = await Task.create({name: req.body.name})
        res.status(201).json({task})
    } catch (error) {
        return res.status(500).json({error: true, msg: error})
    }
}

const getSingleTask = async (req, res) => {
    try {
        const {id:TaskID} = req.params
        const task = await Task.findOne({_id: TaskID})
        res.status(200).json({task})

        if(!task) {
            return res.status(404).json({error: true, msg: `no task with id ${TaskID}`})
        }
    } catch (error) {
        return res.status(400).json({ error })
    }
}

const deleteTask = async (req, res) => {
    try {
        const {id} = req.params
        const task = await Task.findOneAndDelete({_id: id})
        res.status(200).json({error: false, msg: 'succesfully deleted'})

    } catch (error) {
        return res.status(404).json({error: error})
    }
}

const updateTask = async (req, res) => {
    try {
        const {id: taskID} = req.params
        const {name, completed} = req.body
        const task = await Task.findByIdAndUpdate(taskID, {name, completed})
        res.status(200).json({id: id, data: task})

    } catch (error) {
        return res.status(404).json({error: error, msg: `cannot update task with id `})
        console.log(error);
    }
}

module.exports = {
    getTask,
    createTasks,
    getSingleTask,
    deleteTask,
    updateTask
}