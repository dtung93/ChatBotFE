import axios from 'axios'
import { User } from '../../model/User'
import { handleError } from '@/utils/fn'

const URL = 'http://localhost:5000'

const signUp = async (user: any) => {
  try {
    let data = {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      password: user.password,
    }
    const response = await axios.post(`${URL}/register`, data)
    return response.data
  } catch (err) {
    handleError(err)
  }
}

const signIn = async (user: any) => {
  try {
    let data = {
      email: user.email,
      password: user.password,
    }
    const response = await axios.post(`${URL}/login`, data)
    return response.data
  } catch (err: any) {
    handleError(err)
  }
}

const UserAuthenticationService = {
  signUp,
  signIn,
}

export default UserAuthenticationService
