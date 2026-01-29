const supabase = require('../config/supabaseClient')
const bcrypt = require('bcrypt')
const { validateSignup } = require('../validations/user.validation')

const signup = async (req, res) => {
  const error = validateSignup(req.body)
  if (error) return res.status(400).json({ error })

  const { name, email, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)

  const { data: existingUser } = await supabase
    .from('users2')
    .select('*')
    .eq('email', email)
    .single()

  if (existingUser) {
    return res.status(409).json({ error: 'Email already registered' })
  }

  const { error: dbError } = await supabase
    .from('users2')
    .insert([{ name, email, password: hashedPassword }])

  if (dbError) return res.status(500).json({ error: dbError.message })

  res.status(201).json({ message: 'User registered successfully' })
}

const deleteUser = async (req, res) => {
  const { userId } = req.params

  const { error } = await supabase
    .from('users2')
    .delete()
    .eq('id', userId)

  if (error) return res.status(400).json({ error: error.message })

  res.json({
    message: 'User deleted. All related todos deleted automatically.'
  })
}

module.exports = {
  signup,
  deleteUser
}
