import { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import { CircularProgress } from '@mui/material'
import Link from 'next/link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import UserAuthenticationService from '@/services/api/UserAuthenticationService'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import LoadingButton from '@mui/lab/LoadingButton'
import { Regex } from '@/utils/constant'
import { useRouter } from 'next/router';
import {navigateUrl} from '@/utils/fn'
import FormSignIn from '@/model/FormSignIn'
import { userDetails,checkAuth,encryptCredential,decryptCredential } from '@/utils/fn'
import LoadingIcon from '@/components/LoadingIcon'
const schema = yup.object().shape({
  email: yup
    .string()
    .matches(Regex.EMAIL, 'Email must be a valid chatform address')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
})


export default function Login() {
  const router = useRouter()
  const [notify, setNotify] = useState<{ type: 'success' | 'error'; message: string }>({
    type: 'success',
    message: '',
  })
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loadingMessage,setLoadingMessage] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormSignIn>({
    resolver: yupResolver(schema),
    mode: 'all',
  })
  const [loginSuccess, setIsLoginSucess] = useState(false)
  const onSubmit = (data: FormSignIn) => {
        setLoadingMessage("Verifying information...")
        setIsLoginSucess(true)
    UserAuthenticationService.signIn(data)
      .then((res) => {
        setNotify({ type: 'success', message: res.message })
        setSnackbarOpen(true)
        setIsLoginSucess(true)
        userDetails(res)
        navigateUrl(router, 'auth/chatform', encryptCredential(res.data.email))
      })
      .catch((error) => {
        setLoadingMessage('')
        setIsLoginSucess(false)
        setNotify({ type: 'error', message: error.message })
        setSnackbarOpen(true)
        setTimeout(()=>setSnackbarOpen(false),3000)
      })
  }
  const verification = () => {
    if (checkAuth()) {
      const userDetails = localStorage.getItem('userDetails')
      if(userDetails){
            const user = JSON.parse(userDetails)
            let userEmail = user.email
            setLoadingMessage('You are already signed in! Redirecting...')
            setIsLoginSucess(true)
            navigateUrl(router, 'auth/chatform', userEmail)
      }
    }
  }

    useEffect(() => {
      verification()
    }, [])
    // @ts-ignore
  return (
      <Container component="main" maxWidth="md">
        {isLoggedIn && <h1>YOU ARE LOGGED IN</h1>}
        <CssBaseline />
        <Grid container justifyContent="center" alignItems="center">
          <Grid item sx={{ borderRadius: 0 }}>
            <Avatar
              src="https://cutelogin.netlify.app/assets/logo2.9548f92a.png"
              style={{ width: '100px', height: '100px', borderRadius: 0 }} // Thay đổi kích thước của Avatar tại đây
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            marginTop: 4,
            padding: 4,
            borderRadius: 2.5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // boxShadow: '#6a839c33 0 8px 24px',
          }}
          bgcolor="background.secondary"
        >
          <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
            Welcome back!
          </Typography>
          <Typography component="p" variant="h6" sx={{ mt: 2, opacity: 0.6 }}>
            Enter your credentials to access your account.
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              // inputProps={{
              //   maxLength: 30,
              // }}
              autoComplete="off"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              // onChange={() => trigger('chatform')}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="off"
              inputProps={{
                maxLength: 30,
              }}
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              // onChange={() => trigger('password')}
            />
            <LoadingButton
              disabled={!isValid}
              type="submit"
              fullWidth
              loading={isLoading}
              loadingIndicator="Loading…"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.4,
                opacity: !isValid ? 0.5 : 1,
                bgcolor: !isValid ? 'action.disabledBackground' : 'primary.main',
                color: 'action.disabled',
              }}
            >
              Sign In
            </LoadingButton>

            <Grid container justifyContent="flex-end">
              <Grid item xs>
                <Link href="/auth/signup">
                  <Typography>Forgot password?</Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/auth/signup">
                  <Typography>{"Don't have an account? Sign Up"}</Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert
            severity={notify.type}
            variant="filled"
            sx={{ width: '100%' }}
            onClose={() => setSnackbarOpen(false)}
          >
            {notify.message}
          </Alert>
        </Snackbar>
        {loginSuccess && <LoadingIcon loadingText={loadingMessage} />}
      </Container>
    )
}
