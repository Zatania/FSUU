import { useState, useEffect, forwardRef, useContext } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import TextField from '@mui/material/TextField'
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

const Dashboard = () => {
  // ** Hook
  const { data: session } = useSession()
  const router = useRouter()

  const [selectedRowData, setSelectedRowData] = useState({})
  const [loading, setLoading] = useState(false)

  const ability = useContext(AbilityContext)

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors }
  } = useForm()

  const [show, setShow] = useState(false)

  // For Registrar Side
  const [rows, setRows] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/transaction/getAllTransaction', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        console.log(data)
        setRows(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const handleViewClose = () => {
    setShow(false)
  }

  const handleViewAttachmentClick = attachment => {
    window.open('https://' + attachment, '_blank')
  }

  const handleViewButtonClick = async row => {
    setSelectedRowData(row)

    console.log(selectedRowData)

    // Additional logic or state updates if needed
    setShow(true) // Assuming setShow is a state update function
  }

  const onScheduleSubmit = async () => {
    setLoading(true)

    try {
      const formData = getValues()
      console.log(formData)

      // Make the API call to submit the form data
      const response = await fetch('/api/transaction/setSchedule', {
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
            <Button
              component='label'
              variant='outlined'
              InputProps={{
                readOnly: true
              }}
            >
              View
            </Button>
          ) : (
            <Button component='label' variant='outlined' onClick={() => handleViewButtonClick(row)}>
              View
            </Button>
          )}

          {/* View Dialog */}

          <Dialog
            fullWidth
            open={show}
            maxWidth='sm'
            scroll='body'
            onClose={handleViewClose}
            onBackdropClick={handleViewClose}
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
                  onClick={handleViewClose}
                  sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
                >
                  <Icon icon='mdi:close' />
                </IconButton>
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                  <Typography variant='h5' sx={{ mb: 3 }}>
                    View Transaction
                  </Typography>
                  <Typography variant='body2'>
                    Transaction request from {`${selectedRowData?.firstName} ${selectedRowData?.lastName}`} on{' '}
                    {`${dayjs(selectedRowData?.dateFilled).format('MMMM DD, YYYY')}`}
                  </Typography>
                </Box>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Grid container spacing={6}>
                      <Grid item xs={4}>
                        <Controller
                          name='rowID'
                          control={control}
                          defaultValue={selectedRowData?.id}
                          render={({ field }) => <TextField {...field} type='hidden' />}
                        />
                        <Controller
                          name='firstName'
                          control={control}
                          defaultValue={selectedRowData?.firstName}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              label='First Name'
                              InputProps={{
                                readOnly: true
                              }}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Controller
                          name='lastName'
                          control={control}
                          defaultValue={selectedRowData?.lastName}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              label='Last Name'
                              InputProps={{
                                readOnly: true
                              }}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Controller
                          name='studentNumber'
                          control={control}
                          defaultValue={selectedRowData?.studentNumber}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              label='Student Number'
                              InputProps={{
                                readOnly: true
                              }}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Controller
                          name='homeAddress'
                          control={control}
                          defaultValue={selectedRowData?.homeAddress}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              label='Home Address'
                              InputProps={{
                                readOnly: true
                              }}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Controller
                          name='contactNo'
                          control={control}
                          defaultValue={selectedRowData?.contactNo}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              label='Contact Number'
                              InputProps={{
                                readOnly: true
                              }}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Controller
                          name='purpose'
                          control={control}
                          defaultValue={selectedRowData?.purpose}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              label='Purpose'
                              InputProps={{
                                readOnly: true
                              }}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Button
                          component='label'
                          size='small'
                          variant='outlined'
                          onClick={() => handleViewAttachmentClick(selectedRowData?.attachment)}
                        >
                          View Attachment
                        </Button>
                      </Grid>
                      <Grid item sm={12} xs={12}>
                        <Typography variant='body1' sx={{ textAlign: 'center' }}>
                          Schedule Request for Credentials
                        </Typography>
                      </Grid>
                      {selectedRowData.transcriptCopies !== null ? (
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
                              defaultValue={selectedRowData?.transcriptCopies}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label='Copies'
                                  InputProps={{
                                    readOnly: true
                                  }}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            <Controller
                              name='transcriptSchedule'
                              control={control}
                              defaultValue=''
                              render={({ field }) => <DatePicker {...field} label='Transcript of Records Schedule' />}
                            />
                          </Grid>
                        </>
                      ) : null}
                      {selectedRowData.dismissalCopies !== null ? (
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
                              defaultValue={selectedRowData?.dismissalCopies}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label='Copies'
                                  InputProps={{
                                    readOnly: true
                                  }}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            <Controller
                              name='dismissalSchedule'
                              control={control}
                              defaultValue=''
                              render={({ field }) => <DatePicker {...field} label='Honorable Dismissal Schedule' />}
                            />
                          </Grid>
                        </>
                      ) : null}
                      {selectedRowData.moralCharacterCopies !== null ? (
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
                              defaultValue={selectedRowData?.moralCharacterCopies}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label='Copies'
                                  InputProps={{
                                    readOnly: true
                                  }}
                                />
                              )}
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
                      ) : null}
                      {selectedRowData.diplomaCopies !== null ? (
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
                              defaultValue={selectedRowData?.diplomaCopies}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label='Copies'
                                  InputProps={{
                                    readOnly: true
                                  }}
                                />
                              )}
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
                      ) : null}
                      {selectedRowData.authenticationCopies !== null ? (
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
                              defaultValue={selectedRowData?.authenticationCopies}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label='Copies'
                                  InputProps={{
                                    readOnly: true
                                  }}
                                />
                              )}
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
                      ) : null}
                      {selectedRowData.courseDescriptionCopies !== null ? (
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
                              defaultValue={selectedRowData?.courseDescriptionCopies}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label='Copies'
                                  InputProps={{
                                    readOnly: true
                                  }}
                                />
                              )}
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
                      ) : null}
                      {selectedRowData.certificationCopies !== null ? (
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
                              defaultValue={selectedRowData?.certificationType}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label='Certification Type'
                                  InputProps={{
                                    readOnly: true
                                  }}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item sm={4} xs={12}>
                            <Controller
                              name='certificationCopies'
                              control={control}
                              defaultValue={selectedRowData?.certificationCopies}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label='Copies'
                                  InputProps={{
                                    readOnly: true
                                  }}
                                />
                              )}
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
                      ) : null}
                      {selectedRowData.cavRedRibbonCopies !== null ? (
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
                              defaultValue={selectedRowData?.cavRedRibbonCopies}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label='Copies'
                                  InputProps={{
                                    readOnly: true
                                  }}
                                />
                              )}
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
                      ) : null}
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
                <Button variant='outlined' color='secondary' onClick={handleViewClose}>
                  Cancel
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </>
      )
    }
  ]

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={6}>
        <Grid item sm={12} xs={12}>
          <DataGrid
            autoHeight
            hideFooter
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            pagination={undefined}
          />
        </Grid>
        {ability?.can('read', 'scheduleList') ? <Grid item sm={12} xs={12}></Grid> : null}
      </Grid>
    </LocalizationProvider>
  )
}
Dashboard.acl = {
  action: 'read',
  subject: 'dashboard'
}

export default Dashboard
