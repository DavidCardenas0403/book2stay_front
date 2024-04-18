import axios from "~/api/axios";

export const createProperty = async (propertyData) => {
    try {
        const { data } = await axios.post("/properties", propertyData);
        return data
    } catch (e) {
        console.log(response);
        return e;
    }
};
