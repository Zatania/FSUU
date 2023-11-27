import db from '../../../db'

const handler = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM transactions WHERE transactionStatus IN (?, ?)', ['Submitted', 'Done'])

    // Extract relevant data from each row
    const rows = result[0].map(row => ({
      id: row.id,
      dateFilled: row.dateFilled,
      userID: row.userID,
      studentNumber: row.studentNumber,
      firstName: row.firstName,
      lastName: row.lastName,
      homeAddress: row.homeAddress,
      contactNo: row.contactNo,
      transcriptCopies: row.transcriptCopies,
      transcriptSchedule: row.transcriptSchedule,
      dismissalCopies: row.dismissalCopies,
      dismissalSchedule: row.diplomaSchedule,
      moralCharacterCopies: row.moralCharacterCopies,
      moralCharacterSchedule: row.moralCharacterSchedule,
      diplomaCopies: row.diplomaCopies,
      diplomaSchedule: row.diplomaSchedule,
      authenticationCopies: row.authenticationCopies,
      authenticationSchedule: row.authenticationSchedule,
      courseDescriptionCopies: row.courseDescriptionCopies,
      courseDescriptionSchedule: row.courseDescriptionSchedule,
      certificationType: row.certificationType,
      certificationCopies: row.certificationCopies,
      certificationSchedule: row.certificationSchedule,
      cavRedRibbonCopies: row.cavRedRibbonCopies,
      cavRedRibbonSchedule: row.cavRedRibbonSchedule,
      purpose: row.purpose,
      attachment: row.attachment,
      transactionStatus: row.transactionStatus
    }))

    res.status(200).json(rows)
  } catch (error) {
    console.error('Error checking transaction status:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default handler
