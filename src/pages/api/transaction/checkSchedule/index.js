import db from '../../../db'

const handler = async (req, res) => {
  const { userID } = req.body

  try {
    const result = await db.query(
      `SELECT
        transcriptCopies,
        transcriptSchedule,
        dismissalCopies,
        dismissalSchedule,
        moralCharacterCopies,
        moralCharacterSchedule,
        diplomaCopies,
        diplomaSchedule,
        authenticationCopies,
        authenticationSchedule,
        courseDescriptionCopies,
        courseDescriptionSchedule,
        certificationType,
        certificationCopies,
        certificationSchedule,
        cavRedRibbonCopies,
        cavRedRibbonSchedule
       FROM transactions WHERE userID = ? AND transactionStatus = ?`,
      [userID, 'Scheduled']
    )

    // Extract relevant data from each row
    const rows = result[0].map(row => ({
      transcriptCopies: row.transcriptCopies,
      transcriptSchedule: row.transcriptSchedule,
      dismissalCopies: row.dismissalCopies,
      dismissalSchedule: row.dismissalSchedule,
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
      cavRedRibbonSchedule: row.cavRedRibbonSchedule
    }))

    res.status(200).json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default handler
