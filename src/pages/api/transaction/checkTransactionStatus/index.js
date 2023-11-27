import db from '../../../db'

const handler = async (req, res) => {
  const { userID } = req.body

  try {
    const result = await db.query('SELECT * FROM transactions WHERE userID = ? AND transactionStatus = ?', [
      userID,
      'Pending'
    ])

    // Access the first element of the result array
    const rows = result[0]

    if (rows.length > 0) {
      res.status(200).json({ hasPendingTransaction: true })
    } else {
      res.status(200).json({ hasPendingTransaction: false })
    }
  } catch (error) {
    console.error('Error checking transaction status:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default handler
