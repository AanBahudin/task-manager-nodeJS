const express = require('express')
const router = express.Router();
const {getTask, createTasks, getSingleTask, updateTask, deleteTask} = require('../controllers/taskControllers')

router.route('/').get(getTask).post(createTasks)

router.route('/:id').get(getSingleTask).patch(updateTask).delete(deleteTask)

module.exports = router