import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })
import { checkAuth, decryptCredential } from '../utils/fn'
import { useRouter } from 'next/router';
export default function Home() {
  let [email, setEmail] = useState('')
  let [isAuth, setAuth] = useState(false)
  let [userDetails, setUserDetails]: any = useState(null)
  useEffect(() => {
    if (checkAuth()) {
      setAuth(true)
    } else {
      setAuth(false)
    }
    if (localStorage.getItem('userDetails')) {
      const storedUser = localStorage.getItem('userDetails')
      if (storedUser) {
        const currentUser = JSON.parse(storedUser)
        const currentEmail = currentUser.email
        setEmail(currentEmail)
      }
    }
  }, [])
  return (
    <>
      <div className={styles.fullBody}>
        <Avatar className={styles.myLogo} src='../static/images/logo.jpg' alt='' />
        <div className={styles.header2}>
          <h2 className='header'>Welcome to ChatTTN 1.0</h2>
          <div className={styles.childCompo}>
            {!isAuth && <Link href='/auth/login' style={{ textDecoration: 'none' }}>
              <div className={styles.rowTitle}>Sign-in to chat</div>
            </Link>}
            {!isAuth && <Link href='/auth/signup' style={{ textDecoration: 'none' }}>
              <div className={styles.rowTitle}>No Account? Sign up now!</div>
            </Link>}
            {isAuth && <Link href={`/auth/chatform/${email}`} style={{ textDecoration: 'none' }}>
              <div className={styles.rowTitle}>Continue to chat</div>
            </Link>}
          </div>
        </div>
      </div>
    </>
  )
}
