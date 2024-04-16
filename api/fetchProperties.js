import axios from "~/api/axios";

export const fetchProperties = async () => {
    try {
        const { data } = await axios.get("/properties");
        console.log(data)
        return data
    } catch (e) {
        console.log(response);
        return e;
    }
};
