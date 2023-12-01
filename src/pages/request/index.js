// ** React Imports
import { forwardRef, useState, useEffect } from 'react'

// ** MUI Imports
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import FormLabel from '@mui/material/FormLabel'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Checkbox from '@mui/material/Checkbox'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import FormHelperText from '@mui/material/FormHelperText'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'

// ** Hooks
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

// ** Third Party Imports
import download from 'downloadjs'

//** For Date/Time Picker
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

// ** For form submission
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'

// ** PDF Fill
import { PDFDocument } from 'pdf-lib'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

const RequestCredentials = () => {
  // ** Field States
  const currentDate = dayjs(Date.now())

  // ** Other states

  // ** Transaction Price
  const transcriptPrice = 500
  const dismissalPrice = 500
  const moralCharacterPrice = 100
  const diplomaPrice = 500
  const authenticationPrice = 50
  const courseDescriptionPrice = 500
  const certificationPrice = 100
  const cavRedRibbonPrice = 300

  // ** Transcription Amount
  let transcriptTotalAmount = 0
  let dismissalTotalAmount = 0
  let moralCharacterTotalAmount = 0
  let diplomaTotalAmount = 0
  let authenticationTotalAmount = 0
  let courseDescriptionTotalAmount = 0
  let certificationTotalAmount = 0
  let cavRedRibbonTotalAmount = 0

  const [loading, setLoading] = useState(false)

  const [showFields, setShowFields] = useState({
    transcript: false,
    dismissal: false,
    moralCharacter: false,
    diploma: false,
    authentication: false,
    courseDescription: false,
    certification: false,
    cavRedRibbon: false
  })

  const handleCheckboxChange = field => {
    setShowFields(prevShowFields => ({
      ...prevShowFields,
      [field]: !prevShowFields[field]
    }))
  }

  // ** Hook
  const { data: session } = useSession()

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    getValues,
    formState: { errors }
  } = useForm()

  const graduateCheckValue = watch('graduateCheck')

  // Fill up pdf form
  const fillForm = async formData => {
    const formUrl = 'http://localhost:3000/pdf/fsuu-request-form.pdf'
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())

    const pdfDoc = await PDFDocument.load(formPdfBytes)

    const form = pdfDoc.getForm()

    const dateFilled = form.getTextField('Date filled')
    const studentNumber = form.getTextField('Student#')
    const nameOfStudent = form.getTextField('Name of Student')
    const course = form.getTextField('Course')
    const major = form.getTextField('MajorSpecialization')
    const graduatedYes = form.getTextField('Yes')
    const graduatedNo = form.getTextField('No')
    const graduationDate = form.getTextField('Date of Graduation')
    const academicHonor = form.getTextField('Academic Honor Received')
    const yearLevel = form.getTextField('If not graduated Year Level')
    const lastSchoolYear = form.getTextField('Last School Year attended')
    const homeAddress = form.getTextField('Home Address')
    const contactNumber = form.getTextField('Contact No')
    const email = form.getTextField('Email Add')
    const birthDate = form.getTextField('Birth Date')
    const birthPlace = form.getTextField('Birth Place')
    const religion = form.getTextField('Religion')
    const citizenship = form.getTextField('Citizenship')
    const sex = form.getTextField('Sex')
    const nameOfFather = form.getTextField('Name of Father')
    const nameOfMother = form.getTextField('Name of Mother')
    const nameOfGuardian = form.getTextField('Name of GuardianSpouse')
    const elementary = form.getTextField('Elementary')
    const elementaryYear = form.getTextField('Elementary Year Graduated')
    const secondary = form.getTextField('Secondary')
    const secondaryYear = form.getTextField('Secondary Year Graduated')
    const juniorHigh = form.getTextField('Junior High')
    const juniorHighYear = form.getTextField('Junior High Year Graduated')
    const seniorHigh = form.getTextField('Senior High')
    const seniorHighYear = form.getTextField('Senior High Year Graduated')
    const tertiary = form.getTextField('Tertiary')
    const tertiaryYear = form.getTextField('Tertiary Year Graduated')
    const employedAt = form.getTextField('Employed at')
    const position = form.getTextField('Position')
    const transcriptCheck = form.getTextField('Transcript of Records')
    const transcriptCopies = form.getTextField('Transcript Copies')
    const transcriptAmount = form.getTextField('Transcript Amount')
    const dismissalCheck = form.getTextField('Honorable Dismissal')
    const dismissalCopies = form.getTextField('Dismissal Copies')
    const dismissalAmount = form.getTextField('Dismissal Amount')
    const moralCharacterCheck = form.getTextField('Good Moral Character')
    const moralCharacterCopies = form.getTextField('Moral Character Copies')
    const moralCharacterAmount = form.getTextField('Moral Character Amount')
    const diplomaCheck = form.getTextField('Diploma')
    const diplomaCopies = form.getTextField('Diploma Copies')
    const diplomaAmount = form.getTextField('Diploma Amount')
    const authenticationCheck = form.getTextField('Authentication')
    const authenticationCopies = form.getTextField('Authentication Copies')
    const authenticationAmount = form.getTextField('Authentication Amount')
    const courseDescriptionCheck = form.getTextField('Course Description')
    const courseDescriptionCopies = form.getTextField('Course Description Copies')
    const courseDescriptionAmount = form.getTextField('Course Description Amount')
    const certificationCheck = form.getTextField('Certification')
    const certificationType = form.getTextField('Certification Type')
    const certificationCopies = form.getTextField('Certification Copies')
    const certificationAmount = form.getTextField('Certification Amount')
    const cavRedRibbonCheck = form.getTextField('CAV')
    const cavRedRibbonCopies = form.getTextField('CAV Copies')
    const cavRedRibbonAmount = form.getTextField('CAV Amount')
    const totalAmount = form.getTextField('Total Amount')
    const purpose = form.getTextField('Purpose')
    const assistedBy = form.getTextField('Assisted by')

    // Fill textfields from form data
    const dateFilledForm = formData.dateFilled
    const formattedDate = dateFilledForm ? dayjs(dateFilledForm).format('MM/DD/YYYY') : ''
    dateFilled.setText(formattedDate)
    studentNumber.setText(formData.studentNumber.toString())
    nameOfStudent.setText(formData.firstName + ' ' + formData.lastName)
    course.setText(formData.course)
    major.setText(formData.major)
    if (formData.graduateCheck === 'yes') {
      graduatedYes.setText('X')
      const graduationDateFilledForm = formData.graduationDate

      const formattedGraduationDate = graduationDateFilledForm
        ? dayjs(graduationDateFilledForm).format('MM/DD/YYYY')
        : ''
      graduationDate.setText(formattedGraduationDate)
      academicHonor.setText(formData.academicHonor)
    } else {
      graduatedNo.setText('X')

      yearLevel.setText(formData.yearLevel)
      lastSchoolYear.setText(formData.lastSchoolYear)
    }
    homeAddress.setText(formData.homeAddress)
    contactNumber.setText(formData.contactNo)
    email.setText(formData.emailAdd)
    const birthDateFilledForm = formData.birthDate
    const formattedBirthDate = birthDateFilledForm ? dayjs(birthDateFilledForm).format('MM/DD/YYYY') : ''
    birthDate.setText(formattedBirthDate)
    birthPlace.setText(formData.birthPlace)
    religion.setText(formData.religion)
    citizenship.setText(formData.citizenship)
    sex.setText(formData.sexSelect)
    if (formData.fatherName) {
      nameOfFather.setText(formData.fatherName)
    }
    if (formData.motherName) {
      nameOfMother.setText(formData.motherName)
    }
    if (formData.guardianName) {
      nameOfGuardian.setText(formData.guardianName)
    }
    elementary.setText(formData.elementary)
    const elementaryYearFilledForm = formData.elementaryGraduated
    const formattedElementaryYear = elementaryYearFilledForm ? dayjs(elementaryYearFilledForm).format('MM/DD/YYYY') : ''
    elementaryYear.setText(formattedElementaryYear)
    if (formData.secondary) {
      secondary.setText(formData.secondary)
      const secondaryYearFilledForm = formData.secondaryGraduated
      const formattedSecondaryYear = secondaryYearFilledForm ? dayjs(secondaryYearFilledForm).format('MM/DD/YYYY') : ''
      secondaryYear.setText(formattedSecondaryYear)
    } else {
      juniorHigh.setText(formData.juniorHigh)
      const juniorHighYearFilledForm = formData.juniorHighGraduated

      const formattedJuniorHighYear = juniorHighYearFilledForm
        ? dayjs(juniorHighYearFilledForm).format('MM/DD/YYYY')
        : ''
      juniorHighYear.setText(formattedJuniorHighYear)
      seniorHigh.setText(formData.seniorHigh)
      const seniorHighYearFilledForm = formData.seniorHighGraduated

      const formattedSeniorHighYear = seniorHighYearFilledForm
        ? dayjs(seniorHighYearFilledForm).format('MM/DD/YYYY')
        : ''
      seniorHighYear.setText(formattedSeniorHighYear)
    }
    if (formData.tertiary) {
      tertiary.setText(formData.tertiary)
      const tertiaryYearFilledForm = formData.tertiaryGraduated
      const formattedTertiaryYear = tertiaryYearFilledForm ? dayjs(tertiaryYearFilledForm).format('MM/DD/YYYY') : ''
      tertiaryYear.setText(formattedTertiaryYear)
    }
    if (formData.employedAt) {
      employedAt.setText(formData.employedAt)
      position.setText(formData.position)
    }
    if (formData.transcriptCopies) {
      transcriptCheck.setText('X')
      transcriptCopies.setText(formData.transcriptCopies)
      transcriptTotalAmount = formData.transcriptCopies * transcriptPrice
      transcriptAmount.setText(transcriptTotalAmount.toString())
    }
    if (formData.dismissalCopies) {
      dismissalCheck.setText('X')
      dismissalCopies.setText(formData.dismissalCopies)
      dismissalTotalAmount = formData.dismissalCopies * dismissalPrice
      dismissalAmount.setText(dismissalTotalAmount.toString())
    }
    if (formData.moralCharacterCopies) {
      moralCharacterCheck.setText('X')
      moralCharacterCopies.setText(formData.moralCharacterCopies)
      moralCharacterTotalAmount = formData.moralCharacterCopies * moralCharacterPrice
      moralCharacterAmount.setText(moralCharacterTotalAmount.toString())
    }
    if (formData.diplomaCopies) {
      diplomaCheck.setText('X')
      diplomaCopies.setText(formData.diplomaCopies)
      diplomaTotalAmount = formData.diplomaCopies * diplomaPrice
      diplomaAmount.setText(diplomaTotalAmount.toString())
    }
    if (formData.authenticationCopies) {
      authenticationCheck.setText('X')
      authenticationCopies.setText(formData.authenticationCopies)
      authenticationTotalAmount = formData.authenticationCopies * authenticationPrice
      authenticationAmount.setText(authenticationTotalAmount.toString())
    }
    if (formData.courseDescriptionCopies) {
      courseDescriptionCheck.setText('X')
      courseDescriptionCopies.setText(formData.courseDescriptionCopies)
      courseDescriptionTotalAmount = formData.courseDescriptionCopies * courseDescriptionPrice
      courseDescriptionAmount.setText(courseDescriptionTotalAmount.toString())
    }
    if (formData.certificationCopies) {
      certificationCheck.setText('X')
      certificationType.setText(formData.certificationType)
      certificationCopies.setText(formData.certificationCopies)
      certificationTotalAmount = formData.certificationCopies * certificationPrice
      certificationAmount.setText(certificationTotalAmount.toString())
    }
    if (formData.cavRedRibbonCopies) {
      cavRedRibbonCheck.setText('X')
      cavRedRibbonCopies.setText(formData.cavRedRibbonCopies)
      cavRedRibbonTotalAmount = formData.cavRedRibbonCopies * cavRedRibbonPrice
      cavRedRibbonAmount.setText(cavRedRibbonTotalAmount.toString())
    }

    const totalAmountString = (
      transcriptTotalAmount +
      dismissalTotalAmount +
      moralCharacterTotalAmount +
      diplomaTotalAmount +
      authenticationTotalAmount +
      courseDescriptionTotalAmount +
      certificationTotalAmount +
      cavRedRibbonTotalAmount
    ).toString()

    totalAmount.setText(totalAmountString)
    purpose.setText(formData.purpose)
    assistedBy.setText('Online Filled by: ' + formData.firstName + ' ' + formData.lastName)

    // save pdf
    const pdfBytes = await pdfDoc.save()

    download(pdfBytes, formData.lastName + '-CredentialRequest.pdf', 'application/pdf')
  }

  // hooks
  const router = useRouter()

  const onSubmit = async () => {
    setLoading(true)

    try {
      const userID = session.user.id

      // Get the form data using getValues() from the control prop
      const formData = getValues()

      // Make the API call to submit the form data
      const response = await fetch('/api/transaction/requestSubmission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userID, formData })
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      // Simulate a delay (e.g., API call) with a sleep function
      const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
      await sleep(2000)

      // Use the fillForm function to set values in the PDF
      await fillForm(formData)

      setLoading(false)
      toast.success('Form Submitted')
      router.push('/')
    } catch (error) {
      console.error('Error submitting form:', error)
      setLoading(false)
      toast.error('Failed to submit form')
    }
  }

  // Reset form state when needed
  const handleReset = () => {
    reset()
  }

  // Check transaction Status

  const [hasPendingTransaction, setHasPendingTransaction] = useState(false)

  useEffect(() => {
    const userID = session.user.id

    fetch('/api/transaction/checkTransactionStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userID })
    })
      .then(response => response.json())
      .then(data => {
        setHasPendingTransaction(data.hasPendingTransaction)

        // Redirect to the index page if there is a pending transaction.
        if (data.hasPendingTransaction) {
          router.push('/')
          toast.error('Pending Transaction Found')
        }
      })
      .catch(error => {
        console.error('Error checking transaction status:', error)

        // Handle error as needed
      })
  }, [router, session.user.id])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Card>
        <CardHeader title='SCHOOL CREDENTIAL REQUEST AND CLEARANCE SLIP' />
        <Divider sx={{ m: '0 !important' }} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body1' sx={{ fontWeight: 600 }}>
                  1. Personal Data
                </Typography>
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='dateFilled'
                    control={control}
                    defaultValue={currentDate}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        label='Date Filled'
                        value={value}
                        onChange={onChange}
                        InputProps={{
                          readOnly: true
                        }}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='studentNumber'
                    control={control}
                    defaultValue={session.user.studentNumber}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        label='Student Number'
                        type='number'
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors.studentNumber)}
                        aria-describedby='validation-async-student-number'
                        InputProps={{
                          readOnly: true
                        }}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='firstName'
                    control={control}
                    defaultValue={session.user.firstName}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        label='First Name'
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors.firstName)}
                        aria-describedby='validation-async-first-name'
                        InputProps={{
                          readOnly: true
                        }}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='lastName'
                    control={control}
                    defaultValue={session.user.lastName}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        label='Last Name'
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors.lastName)}
                        aria-describedby='validation-async-last-name'
                        InputProps={{
                          readOnly: true
                        }}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='course'
                    control={control}
                    defaultValue=''
                    rules={{ required: true }}
                    render={({ field: { onChange } }) => (
                      <TextField
                        fullWidth
                        label='Course'
                        onChange={onChange}
                        error={Boolean(errors.course)}
                        aria-describedby='validation-async-course'
                      />
                    )}
                  />
                  {errors.course && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-async-course'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='major'
                    control={control}
                    defaultValue=''
                    rules={{ required: true }}
                    render={({ field: { onChange } }) => (
                      <TextField
                        fullWidth
                        label='Major/Specialization'
                        onChange={onChange}
                        error={Boolean(errors.major)}
                        aria-describedby='validation-async-major'
                      />
                    )}
                  />
                  {errors.major && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-async-major'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item sm={3} xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='graduateCheck'
                    control={control}
                    defaultValue=''
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <>
                        <FormLabel id='graduatecheck'>Graduated:</FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby='graduatecheck'
                          name='graduatecheck-group'
                          value={value}
                          onChange={e => {
                            onChange(e)
                            setValue('graduationDate', '') // Reset graduationDate when changing graduateCheck
                            setValue('academicHonor', '') // Reset academicHonor when changing graduateCheck
                            setValue('yearLevel', '1st Year') // Reset yearLevel when changing graduateCheck
                            setValue('lastSchoolYear', '') // Reset lastSchoolYear when changing graduateCheck
                          }}
                        >
                          <FormControlLabel value='yes' control={<Radio />} label='Yes' />
                          <FormControlLabel value='no' control={<Radio />} label='No' />
                        </RadioGroup>
                      </>
                    )}
                  />
                  {errors.graduateCheck && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-async-course'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              {graduateCheckValue === 'yes' && (
                <>
                  <Grid item sm={3} xs={12}>
                    <Controller
                      name='graduationDate'
                      control={control}
                      defaultValue=''
                      render={({ field }) => <DatePicker {...field} label='Graduation Date' />}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <Controller
                      name='academicHonor'
                      control={control}
                      defaultValue=''
                      rules={{ required: 'This field is required' }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label='Academic Honor Received'
                          error={!!errors.academicHonor}
                          helperText={errors.academicHonor?.message}
                        />
                      )}
                    />
                  </Grid>
                </>
              )}
              {graduateCheckValue === 'no' && (
                <>
                  <Grid item sm={3} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id='yearlevel-select'>If not graduated, Year Level</InputLabel>
                      <Controller
                        name='yearLevel'
                        control={control}
                        rules={{ required: 'This field is required' }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            labelId='yearlevel-select'
                            label='If not graduated, Year Level'
                            error={!!errors.yearLevel}
                          >
                            <MenuItem value=''></MenuItem>
                            <MenuItem value='1st Year'>1st Year</MenuItem>
                            <MenuItem value='2nd Year'>2nd Year</MenuItem>
                            <MenuItem value='3rd Year'>3rd Year</MenuItem>
                            <MenuItem value='4th Year'>4th Year</MenuItem>
                          </Select>
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <Controller
                      name='lastSchoolYear'
                      control={control}
                      rules={{ required: 'This field is required' }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label='School Year (e.g. 2020-2021 1st Semester)'
                          error={!!errors.lastSchoolYear}
                          helperText={errors.lastSchoolYear?.message}
                        />
                      )}
                    />
                  </Grid>
                </>
              )}
              <Grid item sm={12} xs={12}>
                <Controller
                  name='homeAddress'
                  control={control}
                  defaultValue=''
                  rules={{ required: 'This field is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Home Address'
                      error={!!errors.homeAddress}
                      helperText={errors.homeAddress?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Controller
                  name='contactNo'
                  control={control}
                  defaultValue=''
                  rules={{ required: 'This field is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type='number'
                      label='Contact No.'
                      error={!!errors.contactNo}
                      helperText={errors.contactNo?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Controller
                  name='emailAdd'
                  control={control}
                  defaultValue=''
                  rules={{ required: 'This field is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Email Add.'
                      error={!!errors.emailAdd}
                      helperText={errors.emailAdd?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Controller
                  name='birthDate'
                  control={control}
                  defaultValue={currentDate}
                  render={({ field }) => <DatePicker {...field} label='Birth Date' />}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Controller
                  name='birthPlace'
                  control={control}
                  defaultValue=''
                  rules={{ required: 'This field is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Birth Place'
                      error={!!errors.birthPlace}
                      helperText={errors.birthPlace?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={4} xs={12}>
                <Controller
                  name='religion'
                  control={control}
                  defaultValue=''
                  rules={{ required: 'This field is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Religion'
                      error={!!errors.religion}
                      helperText={errors.religion?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={4} xs={12}>
                <Controller
                  name='citizenship'
                  control={control}
                  defaultValue=''
                  rules={{ required: 'This field is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Citizenship'
                      error={!!errors.citizenship}
                      helperText={errors.citizenship?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='sex-select'>Sex</InputLabel>
                  <Controller
                    name='sexSelect'
                    control={control}
                    defaultValue='Male'
                    rules={{ required: 'This field is required' }}
                    render={({ field }) => (
                      <Select {...field} labelId='sexSelect' label='Sex' error={!!errors.sexSelect}>
                        <MenuItem value='Male'>Male</MenuItem>
                        <MenuItem value='Female'>Female</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={12} xs={12}>
                <Controller
                  name='fatherName'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Name of Father'
                      error={!!errors.fatherName}
                      helperText={errors.fatherName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <Controller
                  name='motherName'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Name of Mother'
                      error={!!errors.motherName}
                      helperText={errors.motherName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <Controller
                  name='guardianName'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Name of Guardian/Spouse'
                      error={!!errors.guardianName}
                      helperText={errors.guardianName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  If annulled pls. present supporting documents (female only)
                </Typography>
              </Grid>
              <Grid item sm={12} xs={12}>
                <Divider sx={{ mb: '0 !important' }} />
              </Grid>
              <Grid item sm={12} xs={12}>
                <Typography variant='body1' sx={{ fontWeight: 600 }}>
                  2. Preliminary Education
                </Typography>
              </Grid>
              <Grid item sm={9} xs={12}>
                <Controller
                  name='elementary'
                  control={control}
                  defaultValue=''
                  rules={{ required: 'This field is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Elementary'
                      error={!!errors.elementary}
                      helperText={errors.elementary?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={3} xs={12}>
                <Controller
                  name='elementaryGraduated'
                  control={control}
                  defaultValue=''
                  render={({ field }) => <DatePicker {...field} label='Elementary Year Graduated' />}
                />
              </Grid>
              <Grid item sm={9} xs={12}>
                <Controller
                  name='secondary'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Secondary'
                      error={!!errors.secondary}
                      helperText={errors.secondary?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={3} xs={12}>
                <Controller
                  name='secondaryGraduated'
                  control={control}
                  defaultValue=''
                  render={({ field }) => <DatePicker {...field} label='Secondary Year Graduated' />}
                />
              </Grid>
              <Grid item sm={9} xs={12}>
                <Controller
                  name='juniorHigh'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Junior High'
                      error={!!errors.juniorHigh}
                      helperText={errors.juniorHigh?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={3} xs={12}>
                <Controller
                  name='juniorHighGraduated'
                  control={control}
                  defaultValue=''
                  render={({ field }) => <DatePicker {...field} label='Junior High Year Graduated' />}
                />
              </Grid>
              <Grid item sm={9} xs={12}>
                <Controller
                  name='seniorHigh'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Senior High'
                      error={!!errors.seniorHigh}
                      helperText={errors.seniorHigh?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={3} xs={12}>
                <Controller
                  name='seniorHighGraduated'
                  control={control}
                  defaultValue=''
                  render={({ field }) => <DatePicker {...field} label='Senior High Year Graduated' />}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <Divider sx={{ mb: '0 !important' }} />
              </Grid>
              <Grid item sm={12} xs={12}>
                <Typography variant='body1' sx={{ fontWeight: 600 }}>
                  3. For Law & Graduate Studies Students
                </Typography>
              </Grid>
              <Grid item sm={9} xs={12}>
                <Controller
                  name='tertiary'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Tertiary'
                      error={!!errors.tertiary}
                      helperText={errors.tertiary?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={3} xs={12}>
                <Controller
                  name='tertiaryGraduated'
                  control={control}
                  defaultValue=''
                  render={({ field }) => <DatePicker {...field} label='Tertiary Year Graduated' />}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <Divider sx={{ mb: '0 !important' }} />
              </Grid>
              <Grid item sm={12} xs={12}>
                <Typography variant='body1' sx={{ fontWeight: 600 }}>
                  4. Please fill-out below if currently employed
                </Typography>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Controller
                  name='employedAt'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Employed at'
                      error={!!errors.employedAt}
                      helperText={errors.employedAt?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Controller
                  name='position'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Position'
                      error={!!errors.position}
                      helperText={errors.position?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <Divider sx={{ mb: '0 !important' }} />
              </Grid>
              <Grid item sm={12} xs={12}>
                <Typography variant='body1' sx={{ fontWeight: 600 }}>
                  5. Requesting for: (check applicable box or boxes)
                </Typography>
              </Grid>
              <Grid item sm={12} xs={12}>
                <FormGroup row>
                  <FormControlLabel
                    label='Transcript of Records'
                    control={
                      <Checkbox
                        name='transcript'
                        checked={showFields.transcript}
                        onChange={() => handleCheckboxChange('transcript')}
                      />
                    }
                  />
                  <FormControlLabel
                    label='Honorable Dismissal'
                    control={
                      <Checkbox
                        name='dismissal'
                        checked={showFields.dismissal}
                        onChange={() => handleCheckboxChange('dismissal')}
                      />
                    }
                  />
                  <FormControlLabel
                    label='Good Moral Character'
                    control={
                      <Checkbox
                        name='moralCharacter'
                        checked={showFields.moralCharacter}
                        onChange={() => handleCheckboxChange('moralCharacter')}
                      />
                    }
                  />
                  <FormControlLabel
                    label='Diploma'
                    control={
                      <Checkbox
                        name='diploma'
                        checked={showFields.diploma}
                        onChange={() => handleCheckboxChange('diploma')}
                      />
                    }
                  />
                  <FormControlLabel
                    label='Authentication'
                    control={
                      <Checkbox
                        name='authentication'
                        checked={showFields.authentication}
                        onChange={() => handleCheckboxChange('authentication')}
                      />
                    }
                  />
                  <FormControlLabel
                    label='Course Description / Outline'
                    control={
                      <Checkbox
                        name='courseDescription'
                        checked={showFields.courseDescription}
                        onChange={() => handleCheckboxChange('courseDescription')}
                      />
                    }
                  />
                  <FormControlLabel
                    label='Certification'
                    control={
                      <Checkbox
                        name='certification'
                        checked={showFields.certification}
                        onChange={() => handleCheckboxChange('certification')}
                      />
                    }
                  />
                  <FormControlLabel
                    label='CAV / Red Ribbon'
                    control={
                      <Checkbox
                        name='cavRedRibbon'
                        checked={showFields.cavRedRibbon}
                        onChange={() => handleCheckboxChange('cavRedRibbon')}
                      />
                    }
                  />
                </FormGroup>
              </Grid>
              {showFields.transcript && (
                <>
                  <Grid item sm={12} xs={12}>
                    <Typography variant='body2' sx={{ textAlign: 'center' }}>
                      Transcript of Records
                    </Typography>
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <Controller
                      name='transcriptCopies'
                      control={control}
                      rules={{ required: 'This field is required' }}
                      defaultValue='0'
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type='number'
                          label='Number of Copy'
                          error={!!errors.transcriptCopies}
                          helperText={errors.transcriptCopies?.message}
                        />
                      )}
                    />
                  </Grid>
                </>
              )}
              {showFields.dismissal && (
                <>
                  <Grid item sm={12} xs={12}>
                    <Typography variant='body2' sx={{ textAlign: 'center' }}>
                      Honorable Dismissal
                    </Typography>
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <Controller
                      name='dismissalCopies'
                      control={control}
                      rules={{ required: 'This field is required' }}
                      defaultValue='0'
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type='number'
                          label='Number of Copy'
                          error={!!errors.dismissalCopies}
                          helperText={errors.dismissalCopies?.message}
                        />
                      )}
                    />
                  </Grid>
                </>
              )}
              {showFields.moralCharacter && (
                <>
                  <Grid item sm={12} xs={12}>
                    <Typography variant='body2' sx={{ textAlign: 'center' }}>
                      Good Moral Character
                    </Typography>
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <Controller
                      name='moralCharacterCopies'
                      control={control}
                      rules={{ required: 'This field is required' }}
                      defaultValue='0'
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type='number'
                          label='Number of Copy'
                          error={!!errors.moralCharacterCopies}
                          helperText={errors.moralCharacterCopies?.message}
                        />
                      )}
                    />
                  </Grid>
                </>
              )}
              {showFields.diploma && (
                <>
                  <Grid item sm={12} xs={12}>
                    <Typography variant='body2' sx={{ textAlign: 'center' }}>
                      Diploma
                    </Typography>
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <Controller
                      name='diplomaCopies'
                      control={control}
                      rules={{ required: 'This field is required' }}
                      defaultValue='0'
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type='number'
                          label='Number of Copy'
                          error={!!errors.diplomaCopies}
                          helperText={errors.diplomaCopies?.message}
                        />
                      )}
                    />
                  </Grid>
                </>
              )}
              {showFields.authentication && (
                <>
                  <Grid item sm={12} xs={12}>
                    <Typography variant='body2' sx={{ textAlign: 'center' }}>
                      Authentication
                    </Typography>
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <Controller
                      name='authenticationCopies'
                      control={control}
                      rules={{ required: 'This field is required' }}
                      defaultValue='0'
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type='number'
                          label='Number of Copy'
                          error={!!errors.authenticationCopies}
                          helperText={errors.authenticationCopies?.message}
                        />
                      )}
                    />
                  </Grid>
                </>
              )}
              {showFields.courseDescription && (
                <>
                  <Grid item sm={12} xs={12}>
                    <Typography variant='body2' sx={{ textAlign: 'center' }}>
                      Course Description / Outline
                    </Typography>
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <Controller
                      name='courseDescriptionCopies'
                      control={control}
                      rules={{ required: 'This field is required' }}
                      defaultValue='0'
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type='number'
                          label='Number of Copy'
                          error={!!errors.courseDescriptionCopies}
                          helperText={errors.courseDescriptionCopies?.message}
                        />
                      )}
                    />
                  </Grid>
                </>
              )}
              {showFields.certification && (
                <>
                  <Grid item sm={12} xs={12}>
                    <Typography variant='body2' sx={{ textAlign: 'center' }}>
                      Certification
                    </Typography>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <Controller
                      name='certificationType'
                      control={control}
                      rules={{ required: 'This field is required' }}
                      defaultValue=''
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label='Type of Certification'
                          error={!!errors.certificationType}
                          helperText={errors.certificationType?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <Controller
                      name='certificationCopies'
                      control={control}
                      rules={{ required: 'This field is required' }}
                      defaultValue='0'
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type='number'
                          label='Number of Copy'
                          error={!!errors.certificationCopies}
                          helperText={errors.certificationCopies?.message}
                        />
                      )}
                    />
                  </Grid>
                </>
              )}
              {showFields.cavRedRibbon && (
                <>
                  <Grid item sm={12} xs={12}>
                    <Typography variant='body2' sx={{ textAlign: 'center' }}>
                      CAV / Red Ribbon
                    </Typography>
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <Controller
                      name='cavRedRibbonCopies'
                      control={control}
                      rules={{ required: 'This field is required' }}
                      defaultValue='0'
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type='number'
                          label='Number of Copy'
                          error={!!errors.cavRedRibbonCopies}
                          helperText={errors.cavRedRibbonCopies?.message}
                        />
                      )}
                    />
                  </Grid>
                </>
              )}
              <Grid item sm={12} xs={12}>
                <Divider sx={{ mb: '0 !important' }} />
              </Grid>
              <Grid item sm={12} xs={12}>
                <Typography variant='body1' sx={{ fontWeight: 600 }}>
                  6. Purpose of Request
                </Typography>
              </Grid>
              <Grid item sm={12} xs={12}>
                <Controller
                  name='purpose'
                  control={control}
                  rules={{ required: 'This field is required' }}
                  defaultValue=''
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Purpose'
                      error={!!errors.purpose}
                      helperText={errors.purpose?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
          <CardActions>
            <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
              Submit
            </Button>
            <Button type='reset' size='large' color='secondary' variant='outlined' onClick={handleReset}>
              Reset
            </Button>
          </CardActions>
        </form>
      </Card>
    </LocalizationProvider>
  )
}
RequestCredentials.acl = {
  action: 'read',
  subject: 'request-page'
}

export default RequestCredentials
