import db from '../../../db'

const handler = async (req, res) => {
  const { userID } = req.body

  try {
    const result = await db.query('SELECT * FROM transactions WHERE userID = ? AND transactionStatus IN (?, ?, ?)', [
      userID,
      'Pending',
      'Submitted',
      'Done'
    ])

    // Extract relevant data from each row
    const rows = result[0].map(row => ({
      id: row.id,
      dateFilled: row.dateFilled,
      transactionStatus: row.transactionStatus
    }))

    res.status(200).json(rows)
  } catch (error) {
    console.error('Error checking transaction status:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default handler
