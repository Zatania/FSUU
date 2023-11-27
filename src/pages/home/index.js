import { useState, useEffect, forwardRef, useContext } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import { DataGrid } from '@mui/x-data-grid'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import Fade from '@mui/material/Fade'

import { DatePicker } from '@mui/x-date-pickers/DatePicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import OptionsMenu from 'src/@core/components/option-menu'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Third Party
import dayjs from 'dayjs'
import { useForm, Controller } from 'react-hook-form'

// ** Hooks
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router' // import the useRouter hook
import toast from 'react-hot-toast'

//** For Date/Time Picker
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

const Home = () => {
  // ** Hook
  const { data: session } = useSession()
  const router = useRouter()

  const [selectedRowId, setSelectedRowId] = useState(null)
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors }
  } = useForm()

  const [data, setData] = useState([])
  const [rows, setRows] = useState([])
  const [show, setShow] = useState(false)

  // For Registrar Side
  const [transactionRows, setTransactionRows] = useState([])

  const handleClose = () => {
    setShow(false)
    setValue('attachment', '')
  }
  const [hasPendingTransaction, setHasPendingTransaction] = useState(false)

  const onSubmit = async () => {
    setLoading(true)
    try {
      // Include the row ID in the form data
      const formData = getValues()

      // Make the API call to submit the form data
      const response3 = await fetch('/api/transaction/attachLink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ formData })
      })

      setLoading(false)
      toast.success('Link Submitted')
      router.push('/')
    } catch (error) {
      console.error('Error submitting link:', error)
      setLoading(false)
      toast.error('Failed to submit link')
    }
  }

  const handleButtonClick = async rowId => {
    setSelectedRowId(rowId)

    // Additional logic or state updates if needed
    await setShow(true) // Assuming setShow is a state update function
  }

  const handleViewButtonClick = async rowId => {
    setSelectedRowId(rowId)

    // Additional logic or state updates if needed
    await setShow(true) // Assuming setShow is a state update function
  }

  const onScheduleSubmit = async () => {
    setLoading(true)

    try {
      const formData = getValues()

      // Make the API call to submit the form data
      const response5 = await fetch('/api/transaction/setSchedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ formData })
      })

      setLoading(false)
      toast.success('Link Submitted')
      router.push('/')
    } catch (error) {
      console.error('Error submitting link:', error)
      setLoading(false)
      toast.error('Failed to submit link')
    }
  }

  const columns = [
    {
      flex: 0.1,
      field: 'id',
      minWidth: 50,
      headerName: 'ID',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          {`${row.id}`}
        </Typography>
      )
    },
    {
      flex: 0.2,
      field: 'transactionDate',
      minWidth: 200,
      headerName: 'Transaction Date',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          {`${dayjs(row.dateFilled).format('MMMM DD, YYYY')}`}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: 'transactionStatus',
      headerName: 'Transaction Status',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          {`${row.transactionStatus}`}
        </Typography>
      )
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'attachment',
      headerName: 'Attachment',
      renderCell: ({ row }) => (
        <>
          {['Submitted', 'Done'].includes(row.transactionStatus) ? (
            <Button component='label' variant='outlined' disabled>
              Add Image Link
            </Button>
          ) : (
            <Button component='label' variant='outlined' onClick={() => handleButtonClick(row.id)}>
              Add Image Link
            </Button>
          )}
          <Dialog
            fullWidth
            open={show}
            maxWidth='sm'
            scroll='body'
            onClose={handleClose}
            onBackdropClick={handleClose}
            TransitionComponent={Transition}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogContent
                sx={{
                  position: 'relative',
                  pb: theme => `${theme.spacing(8)} !important`,
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              >
                <IconButton
                  size='small'
                  onClick={handleClose}
                  sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
                >
                  <Icon icon='mdi:close' />
                </IconButton>
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                  <Typography variant='h5' sx={{ mb: 3 }}>
                    Add Link to Image Screenshot
                  </Typography>
                  <Typography variant='body2'>
                    Upload to any image uploading sites like imgur, google drive, etc. and attached the link here.
                  </Typography>
                </Box>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Grid container spacing={6}>
                      <Grid item xs={12}>
                        <Controller
                          name='attachment'
                          control={control}
                          defaultValue=''
                          rules={{ required: 'This field is required' }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              label='Image Attachment Link'
                              error={!!errors.attachment}
                              helperText={errors.attachment?.message}
                            />
                          )}
                        />
                        <Controller
                          name='rowID'
                          control={control}
                          defaultValue={selectedRowId}
                          render={({ field }) => <TextField {...field} type='hidden' />}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions
                sx={{
                  justifyContent: 'center',
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              >
                <Button variant='contained' sx={{ mr: 1 }} type='submit'>
                  Submit
                </Button>
                <Button variant='outlined' color='secondary' onClick={handleClose}>
                  Cancel
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </>
      )
    }
  ]

  const transactionColumns = [
    {
      flex: 0.01,
      field: 'id',
      minWidth: 50,
      headerName: 'ID',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          {`${row.id}`}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: 'transactionDate',
      minWidth: 160,
      headerName: 'Transaction Date',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          {`${dayjs(row.dateFilled).format('MMMM DD, YYYY')}`}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: 'studentNumber',
      minWidth: 150,
      headerName: 'Student Number',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          {`${row.studentNumber}`}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: 'firstName',
      minWidth: 150,
      headerName: 'First Name',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          {`${row.firstName}`}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: 'lastName',
      minWidth: 150,
      headerName: 'Last Name',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          {`${row.lastName}`}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: 'actions',
      minWidth: 150,
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <>
          {['Done'].includes(row.transactionStatus) ? (
            <Button component='label' variant='outlined' disabled>
              Add Image Link
            </Button>
          ) : (
            <Button component='label' variant='outlined' onClick={() => handleViewButtonClick(row.id)}>
              Add Image Link
            </Button>
          )}
          <Dialog
            fullWidth
            open={show}
            maxWidth='sm'
            scroll='body'
            onClose={handleClose}
            onBackdropClick={handleClose}
            TransitionComponent={Transition}
          >
            <form onSubmit={handleSubmit(onScheduleSubmit)}>
              <DialogContent
                sx={{
                  position: 'relative',
                  pb: theme => `${theme.spacing(8)} !important`,
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              >
                <IconButton
                  size='small'
                  onClick={handleClose}
                  sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
                >
                  <Icon icon='mdi:close' />
                </IconButton>
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                  <Typography variant='h5' sx={{ mb: 3 }}>
                    View Transaction
                  </Typography>
                  <Typography variant='body2'>
                    Transaction request from {`${row.firstName} ${row.lastName}`} on{' '}
                    {`${dayjs(row.dateFilled).format('MMMM DD, YYYY')}`}
                  </Typography>
                </Box>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Grid container spacing={6}>
                      <Grid item xs={4}>
                        <Controller
                          name='rowID'
                          control={control}
                          defaultValue={selectedRowId}
                          render={({ field }) => <TextField {...field} type='hidden' />}
                        />
                        <Controller
                          name='firstName'
                          control={control}
                          defaultValue={row.firstName}
                          render={({ field }) => <TextField {...field} fullWidth label='First Name' disabled />}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Controller
                          name='lastName'
                          control={control}
                          defaultValue={row.lastName}
                          render={({ field }) => <TextField {...field} fullWidth label='Last Name' disabled />}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Controller
                          name='studentNumber'
                          control={control}
                          defaultValue={row.studentNumber}
                          render={({ field }) => <TextField {...field} fullWidth label='Student Number' disabled />}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Controller
                          name='homeAddress'
                          control={control}
                          defaultValue={row.homeAddress}
                          render={({ field }) => <TextField {...field} fullWidth label='Home Address' disabled />}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Controller
                          name='contactNo'
                          control={control}
                          defaultValue={row.contactNo}
                          render={({ field }) => <TextField {...field} fullWidth label='Contact Number' disabled />}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Controller
                          name='purpose'
                          control={control}
                          defaultValue={row.purpose}
                          render={({ field }) => <TextField {...field} fullWidth label='Purpose' disabled />}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Button
                          component='label'
                          size='small'
                          variant='outlined'
                          onClick={() => handleViewButtonClick(row.id)}
                        >
                          View Attachment
                        </Button>
                      </Grid>
                      <Grid item sm={12} xs={12}>
                        <Typography variant='body1' sx={{ textAlign: 'center' }}>
                          Schedule Request for Credentials
                        </Typography>
                      </Grid>
                      {row.transcriptCopies !== null && (
                        <>
                          <Grid item sm={12} xs={12}>
                            <Typography variant='body2' sx={{ textAlign: 'center' }}>
                              Transcript of Records
                            </Typography>
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            <Controller
                              name='transcriptCopies'
                              control={control}
                              defaultValue={row.transcriptCopies}
                              render={({ field }) => <TextField {...field} fullWidth label='Copies' disabled />}
                            />
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            <Controller
                              name='transcriptSchedule'
                              control={control}
                              defaultValue=''
                              render={({ field }) => <DatePicker {...field} label='Transcript Schedule' />}
                            />
                          </Grid>
                        </>
                      )}
                      {row.dismissalCopies !== null && (
                        <>
                          <Grid item sm={12} xs={12}>
                            <Typography variant='body2' sx={{ textAlign: 'center' }}>
                              Honorable Dismissal
                            </Typography>
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            <Controller
                              name='dismissalCopies'
                              control={control}
                              defaultValue={row.dismissalCopies}
                              render={({ field }) => <TextField {...field} fullWidth label='Copies' disabled />}
                            />
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            <Controller
                              name='dismissalSchedule'
                              control={control}
                              defaultValue=''
                              render={({ field }) => <DatePicker {...field} label='Transcript Schedule' />}
                            />
                          </Grid>
                        </>
                      )}
                      {row.moralCharacterCopies !== null && (
                        <>
                          <Grid item sm={12} xs={12}>
                            <Typography variant='body2' sx={{ textAlign: 'center' }}>
                              Good Moral Character
                            </Typography>
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            <Controller
                              name='moralCharacterCopies'
                              control={control}
                              defaultValue={row.moralCharacterCopies}
                              render={({ field }) => <TextField {...field} fullWidth label='Copies' disabled />}
                            />
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            <Controller
                              name='moralCharacterSchedule'
                              control={control}
                              defaultValue=''
                              render={({ field }) => <DatePicker {...field} label='Good Moral Character Schedule' />}
                            />
                          </Grid>
                        </>
                      )}
                      {row.diplomaCopies !== null && (
                        <>
                          <Grid item sm={12} xs={12}>
                            <Typography variant='body2' sx={{ textAlign: 'center' }}>
                              Diploma
                            </Typography>
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            <Controller
                              name='diplomaCopies'
                              control={control}
                              defaultValue={row.diplomaCopies}
                              render={({ field }) => <TextField {...field} fullWidth label='Copies' disabled />}
                            />
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            <Controller
                              name='diplomaSchedule'
                              control={control}
                              defaultValue=''
                              render={({ field }) => <DatePicker {...field} label='Diploma Schedule' />}
                            />
                          </Grid>
                        </>
                      )}
                      {row.authenticationCopies !== null && (
                        <>
                          <Grid item sm={12} xs={12}>
                            <Typography variant='body2' sx={{ textAlign: 'center' }}>
                              Authentication
                            </Typography>
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            <Controller
                              name='authenticationCopies'
                              control={control}
                              defaultValue={row.authenticationCopies}
                              render={({ field }) => <TextField {...field} fullWidth label='Copies' disabled />}
                            />
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            <Controller
                              name='authenticationSchedule'
                              control={control}
                              defaultValue=''
                              render={({ field }) => <DatePicker {...field} label='Authentication Schedule' />}
                            />
                          </Grid>
                        </>
                      )}
                      {row.courseDescriptionCopies !== null && (
                        <>
                          <Grid item sm={12} xs={12}>
                            <Typography variant='body2' sx={{ textAlign: 'center' }}>
                              Course Description / Outline
                            </Typography>
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            <Controller
                              name='courseDescriptionCopies'
                              control={control}
                              defaultValue={row.courseDescriptionCopies}
                              render={({ field }) => <TextField {...field} fullWidth label='Copies' disabled />}
                            />
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            <Controller
                              name='courseDescriptionSchedule'
                              control={control}
                              defaultValue=''
                              render={({ field }) => (
                                <DatePicker {...field} label='Course Description/Outline Schedule' />
                              )}
                            />
                          </Grid>
                        </>
                      )}
                      {row.certificationCopies !== null && (
                        <>
                          <Grid item sm={12} xs={12}>
                            <Typography variant='body2' sx={{ textAlign: 'center' }}>
                              Certification
                            </Typography>
                          </Grid>
                          <Grid item sm={4} xs={12}>
                            <Controller
                              name='certificationType'
                              control={control}
                              defaultValue={row.certificationType}
                              render={({ field }) => (
                                <TextField {...field} fullWidth label='Certification Type' disabled />
                              )}
                            />
                          </Grid>
                          <Grid item sm={4} xs={12}>
                            <Controller
                              name='certificationCopies'
                              control={control}
                              defaultValue={row.certificationCopies}
                              render={({ field }) => <TextField {...field} fullWidth label='Copies' disabled />}
                            />
                          </Grid>
                          <Grid item sm={4} xs={12}>
                            <Controller
                              name='certificationSchedule'
                              control={control}
                              defaultValue=''
                              render={({ field }) => <DatePicker {...field} label='Certification Schedule' />}
                            />
                          </Grid>
                        </>
                      )}
                      {row.cavRedRibbonCopies !== null && (
                        <>
                          <Grid item sm={12} xs={12}>
                            <Typography variant='body2' sx={{ textAlign: 'center' }}>
                              CAV / Red Ribbon
                            </Typography>
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            <Controller
                              name='cavRedRibbonCopies'
                              control={control}
                              defaultValue={row.cavRedRibbonCopies}
                              render={({ field }) => <TextField {...field} fullWidth label='Copies' disabled />}
                            />
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            <Controller
                              name='cavRedRibbonSchedule'
                              control={control}
                              defaultValue=''
                              render={({ field }) => <DatePicker {...field} label='CAV / Red Ribbon Schedule' />}
                            />
                          </Grid>
                        </>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions
                sx={{
                  justifyContent: 'center',
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              >
                <Button variant='contained' sx={{ mr: 1 }} type='submit'>
                  Submit
                </Button>
                <Button variant='outlined' color='secondary' onClick={handleClose}>
                  Cancel
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </>
      )
    }
  ]
  useEffect(
    () => {
      const fetchData = async () => {
        try {
          const userID = session.user.id

          const response = await fetch('/api/transaction/checkSchedule', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userID })
          })

          const result = await response.json()

          // Filter out rows with null values
          const filteredData = result.map(row => {
            const filteredRow = {}
            for (const key in row) {
              if (row[key] !== null) {
                filteredRow[key] = row[key]
              }
            }

            return filteredRow
          })

          setData(filteredData)

          const response2 = await fetch('/api/transaction/getPendingTransactions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userID })
          })
          const data2 = await response2.json()

          setRows(data2)

          const response4 = await fetch('/api/transaction/getAllTransaction', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const data4 = await response4.json()
          console.log(data4)
          setTransactionRows(data4)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }

      fetchData()
    },
    [session.user.id],
    []
  )

  const ability = useContext(AbilityContext)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={6}>
        {ability?.can('read', 'transactionStatus') ? (
          <Grid item sm={8} xs={12}>
            <Card>
              <DataGrid
                autoHeight
                hideFooter
                rows={rows}
                columns={columns}
                disableRowSelectionOnClick
                pagination={undefined}
              />
            </Card>
          </Grid>
        ) : null}
        {ability?.can('read', 'transactionSchedule') ? (
          <Grid item sm={4} xs={12}>
            <Card>
              <CardHeader
                title='Transaction Schedule'
                titleTypographyProps={{ sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' } }}
                action={
                  <OptionsMenu
                    options={['Refresh']}
                    iconButtonProps={{ size: 'small', sx: { color: 'text.primary' } }}
                  />
                }
              />
              <CardContent>
                {data.map((item, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        ...(index !== data.length - 1 ? { mb: 5.3 } : {})
                      }}
                    >
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Box sx={{ mr: 2, display: 'flex', mb: 0.4, flexDirection: 'column' }}>
                          <Typography
                            sx={{
                              fontWeight: 500,
                              lineHeight: 1.71,
                              letterSpacing: '0.22px',
                              fontSize: '0.875rem !important'
                            }}
                          >
                            dsfasfd
                          </Typography>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              '& svg': { mr: 1, color: 'text.secondary', verticalAlign: 'middle' }
                            }}
                          >
                            <Icon fontSize='0.875rem' icon='mdi:calendar-blank-outline' />
                            <Typography variant='caption'>dsgfdhfh</Typography>
                          </Box>
                        </Box>
                        <CustomChip
                          skin='light'
                          size='small'
                          label='Scheduled'
                          color='primary'
                          sx={{ height: 20, mt: 0.4, fontSize: '0.75rem', fontWeight: 600 }}
                        />
                      </Box>
                    </Box>
                  )
                })}
              </CardContent>
            </Card>
          </Grid>
        ) : null}

        {ability?.can('read', 'transactions') ? (
          <Grid item sm={12} xs={12}>
            <DataGrid
              autoHeight
              hideFooter
              rows={transactionRows}
              columns={transactionColumns}
              disableRowSelectionOnClick
              pagination={undefined}
            />
          </Grid>
        ) : null}

        {ability?.can('read', 'scheduleList') ? <Grid item sm={12} xs={12}></Grid> : null}
      </Grid>
    </LocalizationProvider>
  )
}
Home.acl = {
  action: 'read',
  subject: 'home'
}

export default Home
