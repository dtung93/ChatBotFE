import React, { useState, useEffect, useRef } from 'react'
import Avatar from '@mui/material/Avatar'
import styles from './Chats.module.css'
import { styled } from '@mui/system'
interface Props {
  userResponse: string
  botResponse: {
    purpose: string
    message: string
    options?: string[]
    sender: string
  }
  sendUserResponse: string
  optionClick: (ev: React.MouseEvent<HTMLElement>) => void
}

interface MessagesInfo {
  purpose?: string
  message: string
  options?: string[]
  sender: string
}

const Chats: React.FC<Props> = (props) => {
  const [messages, setMessages] = useState<MessagesInfo[]>([])
  const dummyRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  // stacking up messages
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          purpose: 'introduction',
          message:
            "Hi there. If you're here, that means you're looking for a job. Tell me, what's your name?",
          sender: 'bot',
        },
      ])
    } else {
      let tempArray = [...messages]
      tempArray.push({ message: props.sendUserResponse, sender: 'user' })
      setMessages(tempArray)
      console.log('before ', messages)

      setTimeout(() => {
        let temp2 = [...tempArray]
        temp2.push(props.botResponse)
        setMessages(temp2)
        console.log('after ',messages)
        console.log('bot response ', props.botResponse)
      }, 1000)
    }
  }, [props.sendUserResponse, props.botResponse])

  // enable autoscroll after each message
  useEffect(() => {
    if (dummyRef && dummyRef.current && bodyRef && bodyRef.current) {
      bodyRef.current.scrollTo({
        top: dummyRef.current.offsetTop,
        behavior: 'smooth',
      })
    }
  }, [messages])

  return (
    <div className={styles.messageContainer} ref={bodyRef}>
      {messages.map((chat,index) => (
        <div key={index}>
          <div className={styles.responseBot}>
            {chat.sender === 'bot'&& <Avatar className={styles.myLogo} src="/static/images/logo.jpg" alt="" />}
            <div className={`message ${chat.sender}`}>
              <p
                style={{
                  color: `${chat.sender === 'user' ? '#393e46' : '#FFBF17'}`,
                  float: `${chat.sender === 'user' ? 'right' : 'left'}`,
                  marginRight: `${chat.sender === 'user' ? '20px' : '0'}`,
                  marginLeft: `${chat.sender === 'user' ? '0' : '50px'}`,
                  background: `${chat.sender === 'user' ? 'white' : '#353739'}`,
                  borderRadius: `${chat.sender === 'user' ? '8px' : '8px'}`,
                  padding: `${chat.sender === 'user' ? '10px' : '10px'}`,
                  maxWidth: '80%',
                  wordWrap: 'break-word'

                }}
              >
                {chat.message}
              </p>
            </div>
          </div>
          {chat.options ? (
            <div className={styles.options}>
              <div>
                <i className="far fa-hand-pointer"></i>
              </div>
              {chat.options.map((option,index) => (
                <p onClick={(e) => props.optionClick(e)} data-id={index} key={index}>
                  {option}
                </p>
              ))}
            </div>
          ) : null}
          <div ref={dummyRef} className={styles.dummyDiv}></div>
        </div>
      ))}
    </div>
  )
}

export default Chats
