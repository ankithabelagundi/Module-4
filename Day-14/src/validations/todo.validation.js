exports.validateTodo = ({ title, userId }) => {
  if (!title || !userId) {
    return 'Title and userId are required'
  }
  return null
}
