// ** Fake user data
// ** Please remove below user data in production and verify user with Real Database
const users = [
  {
    id: 1,
    role: 'admin',
    password: 'admin',
    username: '432234342',
    lastName: 'Doe',
    firstName: 'John',
    email: 'admin@materio.com'
  },
  {
    id: 2,
    role: 'client',
    password: 'client',
    username: '3848923479287',
    lastName: 'Doe',
    firstName: 'Nathan',
    email: 'client@materio.com'
  },
  {
    id: 3,
    role: 'registrar',
    password: 'registrar',
    username: '343423564',
    lastName: 'Doe',
    firstName: 'Jason',
    email: 'client@materio.com'
  }
]

const handler = (req, res) => {
  const { username, password } = req.body

  const user = users.find(u => u.username === username && u.password === password)

  if (user) {
    return res.status(200).json(user)
  } else {
    return res.status(404).json({ message: 'Username or Password is invalid' })
  }
}

export default handler
