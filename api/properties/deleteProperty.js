import axios from '~/api/axios'

export const deleteProperty = async (id) => {
    try {
        const { data } = await axios.delete('/properties/' + id)
        return data
    } catch (e) {
        return e
    }
}
