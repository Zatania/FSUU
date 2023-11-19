// ** React Imports
import { useState, forwardRef } from 'react'

// ** MUI Imports
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import FormLabel from '@mui/material/FormLabel'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import Select from '@mui/material/Select'

//** For Date/Time Picker
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const RequestCredentials = () => {
  // ** States
  const [show, setShow] = useState(false)
  const [languages, setLanguages] = useState([])

  const handleChange = event => {
    const {
      target: { value }
    } = event
    setLanguages(typeof value === 'string' ? value.split(',') : value)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Card>
        <CardContent sx={{ textAlign: 'center', '& svg': { mb: 2 } }}>
          <Icon icon='mdi:format-list-checks' fontSize='2rem' />
          <Typography variant='h6' sx={{ mb: 4 }}>
            Request School Credentials
          </Typography>
          <Typography sx={{ mb: 3 }}>ETA will be different for each credentials. Please be patient.</Typography>
          <Button variant='contained' onClick={() => setShow(true)}>
            Show
          </Button>
        </CardContent>
        <Dialog
          fullWidth
          open={show}
          maxWidth='md'
          scroll='body'
          onClose={() => setShow(false)}
          TransitionComponent={Transition}
          onBackdropClick={() => setShow(false)}
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
              onClick={() => setShow(false)}
              sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
            >
              <Icon icon='mdi:close' />
            </IconButton>
            <Box sx={{ mb: 8, textAlign: 'center' }}>
              <Typography variant='h5' sx={{ mb: 3 }}>
                Request School Credentials
              </Typography>
              <Typography variant='body2'>Please provide your complete full information.</Typography>
            </Box>
            <Grid container spacing={6}>
              <Grid item sm={6} xs={12}>
                <DatePicker label='Date Filled' />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField fullWidth label='Student Number' />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField fullWidth label='First Name' />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField fullWidth label='Last Name' />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField fullWidth label='Course' />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField fullWidth label='Major/Specialization' />
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <FormLabel id='graduatecheck'>Graduated:</FormLabel>
                  <RadioGroup row aria-labelledby='graduatecheck' name='graduatecheck-group'>
                    <FormControlLabel value='yes' control={<Radio />} label='Yes' />
                    <FormControlLabel value='no' control={<Radio />} label='No' />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item sm={6} xs={12}>
                <DatePicker label='Graduation Date' />
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextField fullWidth label='Academic Honor Received' />
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='yearlevel-select'>If not graduated, Year Level</InputLabel>
                  <Select
                    defaultValue='1st Year'
                    fullWidth
                    labelId='yearlevel-select'
                    label='If not graduated, Year Level'
                  >
                    <MenuItem value='1st Year'>1st Year</MenuItem>
                    <MenuItem value='2nd Year'>2nd Year</MenuItem>
                    <MenuItem value='3rd Year'>3rd Year</MenuItem>
                    <MenuItem value='4th Year'>4th Year</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={6} xs={12}>
                <DatePicker label='Last School Year attended' />
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextField fullWidth label='Home Address' />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField fullWidth label='Contact No.' />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField fullWidth label='Email Add.' />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  label='Billing Email'
                  placeholder='johnDoe@email.com'
                  defaultValue='oliverQueen@email.com'
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='status-select'>Status</InputLabel>
                  <Select defaultValue='Status' fullWidth labelId='status-select' label='Status'>
                    <MenuItem value='Status'>Status</MenuItem>
                    <MenuItem value='Active'>Active</MenuItem>
                    <MenuItem value='Inactive'>Inactive</MenuItem>
                    <MenuItem value='Suspended'>Suspended</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField fullWidth label='Tax ID' placeholder='Tax-7490' defaultValue='Tax-8894' />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField fullWidth label='Contact' placeholder='+ 123 456 7890' defaultValue='+1 609 933 4422' />
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='language-select'>Language</InputLabel>
                  <Select
                    multiple
                    fullWidth
                    label='Language'
                    value={languages}
                    onChange={handleChange}
                    labelId='language-select'
                    renderValue={selected => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map(value => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    <MenuItem value='English'>English</MenuItem>
                    <MenuItem value='Spanish'>Spanish</MenuItem>
                    <MenuItem value='French'>French</MenuItem>
                    <MenuItem value='German'>German</MenuItem>
                    <MenuItem value='Hindi'>Hindi</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='country-select'>Country</InputLabel>
                  <Select
                    fullWidth
                    label='Country'
                    placeholder='UK'
                    labelId='country-select'
                    defaultValue='Select Country'
                  >
                    <MenuItem value='Select Country'>Select Country</MenuItem>
                    <MenuItem value='France'>France</MenuItem>
                    <MenuItem value='Russia'>Russia</MenuItem>
                    <MenuItem value='China'>China</MenuItem>
                    <MenuItem value='UK'>UK</MenuItem>
                    <MenuItem value='US'>US</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel control={<Switch defaultChecked />} label='Make this default shipping address' />
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
            <Button variant='contained' sx={{ mr: 1 }} onClick={() => setShow(false)}>
              Submit
            </Button>
            <Button variant='outlined' color='secondary' onClick={() => setShow(false)}>
              Discard
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </LocalizationProvider>
  )
}
RequestCredentials.acl = {
  action: 'read',
  subject: 'request-page'
}

export default RequestCredentials
