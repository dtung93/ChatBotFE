import React, { useEffect, useState } from 'react'
import Chats from '../Chats/Chats'
import styles from './Chatbot.module.css'
import SendIcon from '@mui/icons-material/Send'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { Grid, TextField, TextareaAutosize } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import { useRouter } from 'next/router'
import { checkAuth } from '@/utils/fn'
import { navigateUrl } from '@/utils/fn'
import DeleteIcon from '@mui/icons-material/Delete'
import ChatApiService from '@/services/api/ChatApiService'
interface ResponseBotObject {
  purpose: string
  message: string
  options?: string[]
  sender: string
}

const Chatbot: React.FC = () => {
  const router = useRouter()
  const [userResponse, setUserResponse] = useState<string>('')
  const [step, setStep] = useState<number>(0)
  const [botResponse, setBotResponse] = useState<any>({sender:'bot', message:''})
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [notify, setNotify] = useState<{ type: 'success' | 'error'; message: string }>({
    type: 'success',
    message: '',
  })
  const [sendUserResponse, setSendUserResponse] = useState<string>('')

  // setting next step when there's response and option click
  const setNextStep = async (message: string) => {
    setSendUserResponse(message)
    ChatApiService.callChatBot(message).then((response:any)=>{
      setBotResponse({ sender:'bot', message: response.data.data })
    })
  }

  const optionClick = (e: React.MouseEvent<HTMLElement>) => {
    let option = e.currentTarget.dataset.id
    if (option) {
      setNextStep(option)
    }
  }

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    let history = event.currentTarget.innerText
    if (history) {
      setNextStep(history)
    }
  }

  // event handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserResponse(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (userResponse.trim() === '' || userResponse === null) {
      console.log('empty')
      return
    }
    if (userResponse) {
      setNextStep(userResponse)
    }
  }
  useEffect(() => {
    if (!checkAuth()) {
      setNotify({ type: 'error', message: 'Your session has  expired! Please sign in again.' })
      setSnackbarOpen(true)
      alert('Please log in again!')
      navigateUrl(router, 'auth/login')
    }
  }, [])

  return (
    <Grid container spacing={2} className={styles.container}>
      <Grid item xs={3} className={styles.historyContainer}>
        <Avatar className={styles.myLogo} src="/static/images/logo.jpg" alt="" />
        <List className={styles.history}>
          {[
            'Thằng em 2k ít có nhây và cách xử lý',
            'Vừa đẹp trai vừa giàu có mà vẫn ế?',
            'Tui có thằng bạn mới mua bàn phím và bây giờ làm sao để bắt nó rửa',
            'Giá ròng trường học có cung cấp ước tính chính xác về chi phí không và lần cuối cùng cập nhật được thực hiện là khi nào? ',
            'Tui có thằng bạn mới mua bàn phím và bây giờ làm sao để bắt nó rửa',
            'Vừa đẹp trai vừa giàu có mà vẫn ế?',
            'Các bài thuyết trình được thực hiện thường xuyên như thế nào và các tác phẩm cộng tác được yêu cầu như thế nào? ',
            'Tui có thằng bạn mới mua bàn phím và bây giờ làm sao để bắt nó rửa',
            'Các bài thuyết trình được thực hiện thường xuyên như thế nào và các tác phẩm cộng tác được yêu cầu như thế nào? ',
            'Vừa đẹp trai vừa giàu có mà vẫn ế?',
            'Tui có thằng bạn mới mua bàn phím và bây giờ làm sao để bắt nó rửa',
            'Các bài thuyết trình được thực hiện thường xuyên như thế nào và các tác phẩm cộng tác được yêu cầu như thế nào? ',
            'Material UI List Item Text: Primary Text Overflow - Stack Overflow?',
            'Cách trị thoát vị đĩa đệm cho coder',
            'Các bài thuyết trình được thực hiện thường xuyên như thế nào và các tác phẩm cộng tác được yêu cầu như thế nào? ',
            'Uống cà phê buổi sáng có đau bụng không?',
            'Khuyên ông anh 30 tuổi đi lấy vợ',
            'Cách để có người yêu nhanh chóng',
            'Kiếp coder làm out source làm sao để thoát nghèo?',
          ].map((text, index) => (
            <ListItem key={index}>
              <button className={styles.buttonHistory} onClick={handleClick}>
                <ListItemText
                  primary={text}
                  className={styles.compoHistory}
                  primaryTypographyProps={{ noWrap: true, style: { textOverflow: 'ellipsis' } }}
                />
                <div className={styles.deleteIcon}>
                  <DeleteIcon />
                </div>
              </button>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={9} className={styles.chatForm}>
        <Chats
          userResponse={userResponse}
          botResponse={botResponse}
          sendUserResponse={sendUserResponse}
          optionClick={optionClick}
        />
        <form onSubmit={(e) => handleSubmit(e)} className={styles.formContainer}>
          <input
            style={{ height: '50px' }}
            onChange={(e) => handleInputChange(e)}
            value={userResponse}
            className={styles.input}
            placeholder="Send a message..."
            min={5}
          />
          <button className={styles.buttonIcon}>
            <SendIcon />
          </button>
        </form>
      </Grid>
    </Grid>
  )
}

export default Chatbot
