import axios from '../api/axios'

export const getUser = async (jwt) => {
  let response

  try {
    response = await axios.get('/auth/get-user', {
      token: jwt,
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
