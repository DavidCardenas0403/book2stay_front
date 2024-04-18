import axios from '~/api/axios'

export const signUp = async (name, email, password) => {
  try {
    const { data } = await axios.get('/auth/register')
    console.log(data)
    return data
  } catch (e) {
    console.log(response)
    return e
  }
}
