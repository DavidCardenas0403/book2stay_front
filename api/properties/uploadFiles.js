import axios from '~/api/axios'
export const uploadFiles = async (event) => {
  const formData = new FormData()

  for (const file of event.files) {
    formData.append('images', file)
  }

  try {
    const { data } = await axios.post('/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return data
  } catch (error) {}
}
