import axios from '../api/axios'

export const login = async (email, password) => {
  let response

  try {
    response = await axios.post('/auth/login', {
      email: email,
      password: password,
    })
    if (response.data) {
      console.log(response.data)
      return response.data
    }
  } catch (e) {
    console.log(e)
    return e
  }
}
