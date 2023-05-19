export default interface UserDetails {
  data:{
    email: string,
    first_name: string,
    last_name: string
  },
  message: string,
  statuscode: number,
  token: string
}