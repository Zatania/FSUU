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

  const [selectedRowData, setSelectedRowData] = useState({})

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
  const [schedrows, setSchedRows] = useState([])
  const [show, setShow] = useState(false)
  const [schedShow, setSchedShow] = useState(false)

  const handleClose = () => {
    setShow(false)
    setValue('attachment', '')
  }

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
    setShow(true) // Assuming setShow is a state update function
  }

  const handleViewAttachmentClick = attachment => {
    window.open(attachment, '_blank')
  }

  const handleViewClose = () => {
    setSchedShow(false)
  }

  const handleViewButtonClick = async row => {
    setSelectedRowData(row)

    console.log(selectedRowData)

    // Additional logic or state updates if needed
    setSchedShow(true) // Assuming setShow is a state update function
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

  const schedColumns = [
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
      field: 'view',
      headerName: 'View',
      renderCell: ({ row }) => (
        <>
          <Button component='label' variant='outlined' onClick={() => handleViewButtonClick(row)}>
            View
          </Button>
          {/* View Dialog */}

          <Dialog
            fullWidth
            open={schedShow}
            maxWidth='sm'
            scroll='body'
            onClose={handleViewClose}
            onBackdropClick={handleViewClose}
            TransitionComponent={Transition}
          >
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
                            defaultValue={dayjs(selectedRowData?.transcriptSchedule).format('MMMM DD, YYYY')}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                label='Schedule'
                                InputProps={{
                                  readOnly: true
                                }}
                              />
                            )}
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
                            defaultValue={dayjs(selectedRowData?.dismissalSchedule).format('MMMM DD, YYYY')}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                label='Schedule'
                                InputProps={{
                                  readOnly: true
                                }}
                              />
                            )}
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
                            defaultValue={dayjs(selectedRowData?.moralCharacterSchedule).format('MMMM DD, YYYY')}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                label='Schedule'
                                InputProps={{
                                  readOnly: true
                                }}
                              />
                            )}
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
                            defaultValue={dayjs(selectedRowData?.diplomaSchedule).format('MMMM DD, YYYY')}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                label='Schedule'
                                InputProps={{
                                  readOnly: true
                                }}
                              />
                            )}
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
                            defaultValue={dayjs(selectedRowData?.authenticationSchedule).format('MMMM DD, YYYY')}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                label='Schedule'
                                InputProps={{
                                  readOnly: true
                                }}
                              />
                            )}
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
                            defaultValue={dayjs(selectedRowData?.courseDescriptionSchedule).format('MMMM DD, YYYY')}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                label='Schedule'
                                InputProps={{
                                  readOnly: true
                                }}
                              />
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
                        <Grid item sm={3} xs={12}>
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
                        <Grid item sm={5} xs={12}>
                          <Controller
                            name='certificationSchedule'
                            control={control}
                            defaultValue={dayjs(selectedRowData?.certificationSchedule).format('MMMM DD, YYYY')}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                label='Schedule'
                                InputProps={{
                                  readOnly: true
                                }}
                              />
                            )}
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
                            defaultValue={selectedRowData?.cavRedRibbonSchedule}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                label='Schedule'
                                InputProps={{
                                  readOnly: true
                                }}
                              />
                            )}
                          />
                        </Grid>
                      </>
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        </>
      )
    }
  ]
  useEffect(() => {
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

        console.log('Filtered Data', filteredData)

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

        const response3 = await fetch('/api/transaction/getScheduled', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data3 = await response3.json()

        console.log(data3)
        setSchedRows(data3)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [session.user.id])

  const ability = useContext(AbilityContext)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={6}>
        <Grid item sm={12} xs={12}>
          <Card>
            <CardHeader title='Pending/Submitted Transactions' />
            <CardContent>
              <DataGrid
                autoHeight
                hideFooter
                rows={rows}
                columns={columns}
                disableRowSelectionOnClick
                pagination={undefined}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={12} xs={12}>
          <Card>
            <CardHeader title='Scheduled Transactions' />
            <CardContent>
              <DataGrid
                autoHeight
                hideFooter
                rows={schedrows}
                columns={schedColumns}
                disableRowSelectionOnClick
                pagination={undefined}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </LocalizationProvider>
  )
}
Home.acl = {
  action: 'read',
  subject: 'home'
}

export default Home
