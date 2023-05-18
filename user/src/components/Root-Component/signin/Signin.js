import * as React from 'react';
import './Signin.css'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
// import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
import axios from '../../../helpers/axios'

function Copyright(props) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        Cuba Goa
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate()

  const [inputData, setInputData] = React.useState({
    email: '',
    password: ''
  })


  //handle inputs
  const handleInput = (e) => {
    setInputData(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
  }


  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(inputData)
    try {
      const response = await axios.post('/signin', inputData)
      if (response.data.success) {
        console.log(response.data.message)
        toast.success(response.data.message)
        localStorage.setItem('token', response.data.data.token)
        navigate('/our-properties')
      }
      else {
        toast.error(response.data.message)
      }
    }
    catch (err) {
      // toast.error(err.message);
      console.log(err)
    }
  }


  return (
    <div className='siginWrapper'>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, backgroundColor: 'blue' }}>
              {/* <LockOpenTwoToneIcon /> */}
            </Avatar>


            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                value={inputData.email}
                onChange={handleInput}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                value={inputData.value}
                onChange={handleInput}
                label="Password"
                type="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  Don't have an account?
                  <Button onClick={() => navigate('/register')}>Click here</Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}