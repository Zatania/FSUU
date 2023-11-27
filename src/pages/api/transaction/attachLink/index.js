import db from '../../../db'

const handler = async (req, res) => {
  const { formData } = req.body

  try {
    const sql = 'UPDATE transactions SET transactionStatus = ?, attachment = ? WHERE id = ?'

    const values = ['Submitted', formData.attachment, formData.rowID]

    const result = await db.query(sql, values)

    // Assuming the update was successful, send a success response
    res.status(200).json({ message: 'Update successful' })
  } catch (error) {
    console.error('Database error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default handler
