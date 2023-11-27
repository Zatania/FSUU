import db from '../../db'

// A function to query the MySQL database for user details
const getUserFromDatabase = async (studentNumber, password) => {
  const [rows] = await db.query('SELECT * FROM users WHERE studentNumber = ? AND password = ?', [
    studentNumber,
    password
  ])

  return rows[0]
}

// The main handler function
const handler = async (req, res) => {
  const { studentNumber, password } = req.body

  try {
    // Query the MySQL database for user details
    const user = await getUserFromDatabase(studentNumber, password)

    if (user) {
      return res.status(200).json(user)
    } else {
      return res.status(404).json({ message: 'Student Number or Password is invalid' })
    }
  } catch (error) {
    console.error('Error querying the database:', error)

    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default handler
