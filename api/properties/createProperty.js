import axios from '~/api/axios'

export const createProperty = async (propertyData) => {
  try {
    const { data } = await axios.post('/properties', propertyData)
    console.log(data)
    return data
  } catch (e) {
    return e
  }
}
