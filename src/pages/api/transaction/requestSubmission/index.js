import db from '../../../db'
import { format } from 'date-fns'

const insertFormDataIntoDatabase = async (userID, formData) => {
  const columns = Object.keys(formData)
  const values = Object.values(formData)

  const formattedValues = values.map((value, index) => {
    const columnName = columns[index]

    if (
      [
        'dateFilled',
        'graduationDate',
        'birthDate',
        'elementaryGraduated',
        'secondaryGraduated',
        'juniorHighGraduated',
        'seniorHighGraduated',
        'tertiaryGraduated'
      ].includes(columnName)
    ) {
      return value ? format(new Date(value), 'yyyy-MM-dd') : null
    }

    return value
  })

  // Add 'Pending' for the transactionStatus if not present in form data
  if (!columns.includes('transactionStatus')) {
    columns.push('transactionStatus')
    formattedValues.push('Pending')
  }

  // Add userID
  if (!columns.includes('userID')) {
    columns.push('userID')
    formattedValues.push(userID)
  }

  try {
    const placeholders = Array.from({ length: columns.length }, () => '?').join(', ')

    await db.query(`INSERT INTO transactions (${columns.join(', ')}) VALUES (${placeholders})`, formattedValues)
  } catch (error) {
    console.error('Error inserting data into the database:', error)
    throw error
  }
}

const handler = async (req, res) => {
  const { userID, formData } = req.body

  try {
    await insertFormDataIntoDatabase(userID, formData)

    return res.status(200).json({ message: 'Form data inserted successfully' })
  } catch (error) {
    console.error('Error inserting data into the database:', error)

    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default handler
