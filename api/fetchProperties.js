import axios from "~/api/axios";

export const fetchProperties = async () => {
    try {
        const { data } = await axios.get("/properties");
        return data
    } catch (e) {
        console.log(e);
        return e;
    }
};

export async function fetchFeaturedProperties() {
    try {
        const { data } = await axios.get("/properties/featured")
        return data
    } catch (error) {
        console.log(error)
    }
}

//get single prop by id
export async function fetchProperty(id) {
    try {
        const { data } = await axios.get(`/properties/show/${id}`)
        return data
    } catch (error) {
        console.log(error)
    }
}