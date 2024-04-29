import axios from '~/api/axios'

export const updateProperty = async (propertyData, id) => {
    try {
        const { data } = await axios.put('/properties/' + id, propertyData)
        console.log(data)
        return data
    } catch (e) {
        return e
    }
}
