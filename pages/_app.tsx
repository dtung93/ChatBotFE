import '@/styles/globals.css'
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import {theme } from '../utils/theme'
import Head from 'next/head'
import Image from 'next/image'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>TTN Chat 1.0</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            body: {
              backgroundColor: '#232323',
            },
          }}
        />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
