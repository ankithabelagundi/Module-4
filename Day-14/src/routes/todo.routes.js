const express = require('express')
const {
  createTodo,
  getUserTodos,
  updateTodo,
  deleteTodo
} = require('../controllers/todo.controller')

const router = express.Router()

router.post('/add-todo', createTodo)
router.get('/get-my-todo/:userId', getUserTodos)
router.put('/update-todo/:todoId', updateTodo)
router.delete('/delete-todo/:todoId', deleteTodo)

module.exports = router
