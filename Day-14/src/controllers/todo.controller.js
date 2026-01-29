const supabase = require('../config/supabaseClient')
const { validateTodo } = require('../validations/todo.validation')

exports.createTodo = async (req, res) => {
  const error = validateTodo(req.body)
  if (error) return res.status(400).json({ error })

  const { title, description, userId } = req.body

  const { error: dbError } = await supabase
    .from('todos')
    .insert([{ title, description, users2_id: userId }])

  if (dbError) return res.status(400).json({ error: dbError.message })

  res.status(201).json({ message: 'Todo created successfully' })
}

exports.getUserTodos = async (req, res) => {
  const { userId } = req.params

  const { data: todos, error } = await supabase
    .from('todos')
    .select('*')
    .eq('users2_id', userId)

  if (error) return res.status(400).json({ error: error.message })

  res.json(todos)
}

exports.updateTodo = async (req, res) => {
  const { todoId } = req.params

  const { error } = await supabase
    .from('todos')
    .update(req.body)
    .eq('id', todoId)

  if (error) return res.status(400).json({ error: error.message })

  res.json({ message: 'Todo updated successfully' })
}

exports.deleteTodo = async (req, res) => {
  const { todoId } = req.params

  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', todoId)

  if (error) return res.status(400).json({ error: error.message })

  res.json({ message: 'Todo deleted successfully' })
}
