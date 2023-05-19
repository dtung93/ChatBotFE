import axios from 'axios'
import ChatBotResponse from '@/model/ChatBotResponse'
import { handleError } from '@/utils/fn'


  const URL = 'http://localhost:5000'
  const callChatBot = (message: string) => {
    const result  = axios.post(`${URL}/api/request`, { message: message })
    return result
  }

const ChatApiService = {callChatBot}
export default ChatApiService
