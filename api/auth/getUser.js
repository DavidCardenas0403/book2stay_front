import axios from '../api/axios'

export const getUser = async (jwt) => {
  let response
  console.log('jwt ' + jwt)
  try {
    response = await axios.post('/auth/get-user', {
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
