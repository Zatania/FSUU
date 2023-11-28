import db from '../../../db'
import dayjs from 'dayjs'

const handler = async (req, res) => {
  try {
    const { formData } = req.body

    // Function to format values with "Schedule" in the name
    const formatScheduleValues = formData => {
      const formattedFormData = {}

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && key !== 'rowID') {
          if (key.includes('Schedule')) {
            formattedFormData[key] = dayjs(value).format('YYYY-MM-DD')
          } else {
            formattedFormData[key] = value
          }
        }
      })

      return formattedFormData
    }

    // Format values in formData
    const formattedFormData = formatScheduleValues(formData)

    if (Object.keys(formattedFormData).length === 0) {
      // If there are no valid fields, respond with a bad request status
      return res.status(400).json({ success: false, error: 'No valid fields in formData' })
    }

    const [result] = await db.query('UPDATE transactions SET ?, transactionStatus = ? WHERE id = ?', [
      formattedFormData,
      'Scheduled',
      formData.rowID
    ])

    res.status(200).json({ success: true, data: result })
  } catch (error) {
    console.error('Error processing request:', error)
    res.status(500).json({ success: false, error: 'Internal Server Error' })
  }
}

export default handler
