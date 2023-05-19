import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from 'next/link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { LimitLength, Regex } from '@/utils/constant'
import UserAuthenticationService from '@/services/api/UserAuthenticationService'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { LoadingButton } from '@mui/lab'
import {useRouter} from 'next/router'
import FormSignUp from '../../model/FormSignUp';
import { navigateUrl } from '@/utils/fn'
import LoadingIcon from '@/components/LoadingIcon'
const schema = yup.object().shape({
  firstName: yup
    .string()
    .min(
      LimitLength.MIN_FIRST_NAME,
      `First Name must be at least ${LimitLength.MIN_FIRST_NAME} characters`
    )
    .max(
      LimitLength.MAX_FIRST_NAME,
      `First Name must be max ${LimitLength.MAX_FIRST_NAME} characters`
    )
    .required('First Name is required'),
  lastName: yup
    .string()
    .min(
      LimitLength.MIN_LAST_NAME,
      `Last Name must be at least ${LimitLength.MIN_LAST_NAME} characters`
    )
    .max(LimitLength.MAX_LAST_NAME, `Last Name must be max ${LimitLength.MAX_LAST_NAME} characters`)
    .required('Last Name is required'),
  email: yup
    .string()
    .max(LimitLength.MAX_EMAIL, `Email must be at least ${LimitLength.MAX_EMAIL} characters`)
    .matches(Regex.EMAIL, 'Email must be a valid chatform address')
    .required('Email is required'),
  password: yup
    .string()
    .min(
      LimitLength.MIN_PASSWORD,
      `Password must be at least ${LimitLength.MIN_PASSWORD} characters`
    )
    .max(LimitLength.MAX_PASSWORD, `Password must be max ${LimitLength.MAX_PASSWORD} characters`)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
})
export default function SignUp() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
   const [signUp,setSignUp] = useState(false)
  const [loadingText, setLoadingText] = useState('')
  const [notify, setNotify] = useState<{ type: 'success' | 'error'; message: string }>({
    type: 'success',
    message: '',
  })

  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormSignUp>({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const onSubmit = (data: FormSignUp) => {
    setIsLoading(true)
    UserAuthenticationService.signUp(data)
      .then((res) => {
        setNotify({ type: 'success', message: res.message })
        setLoadingText('Registering your account...')
        setSignUp(true)
        reset()
        setSnackbarOpen(true)
        navigateUrl(router, 'auth/login')
      })
      .catch((error) => {
        setNotify({ type: 'error', message: error.message })
        setSnackbarOpen(true)
        setIsLoading(false)
      })
  }

  return (
    <Container component="main" maxWidth="md">
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
          Registration
        </Typography>
        <Typography component="p" variant="h6" sx={{ mt: 2, opacity: 0.6 }}>
          Enter your information to sign up your account.
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                id="firstName"
                label="First Name"
                {...register('firstName')}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                autoComplete="family-name"
                {...register('lastName')}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                id="password"
                type="password"
                autoComplete="new-password"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                autoComplete="confirm-password"
                {...register('confirmPassword')}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            </Grid>
          </Grid>

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
            Sign Up
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/auth/login">Already have an account? Sign In</Link>
            </Grid>
          </Grid>
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
        </Box>
      </Box>
       {signUp && <LoadingIcon loadingText={loadingText} />}
    </Container>
  )
}
