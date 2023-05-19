import { CircularProgress } from '@mui/material'
import React from 'react'

interface LoadingIconContent {
  loadingText?: string,
}

const LoadingIcon: React.FC<LoadingIconContent> = ({ loadingText=''}) => {
  const styles = {
    loadingOverlay: {
      position: 'fixed' as const,
      inset: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      filter: 'blur(0.5px)',
      zIndex: '100',
    },
    loadingText: {
      fontSize : '50px',
      textAlign: 'center' as const,
      marginTop: '15%',
      color: 'white'
    },
  }
  return (
    <>
      <div style={styles.loadingOverlay}>
        <CircularProgress sx={{
          color: 'primary',
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginTop: '-50px',
          marginLeft: '-50px',
        }} size={100} />
        {loadingText && <div style={styles.loadingText}>{loadingText}</div>}
      </div>
    </>
  )
}
export default LoadingIcon
