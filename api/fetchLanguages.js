import axios from "~/api/axios";

export async function fetchLanguages() {
    try {
        const { data } = await axios.get("/languages");
        return data
    } catch (e) {
        console.log(e);
        return e;
    }
};
