import axios from "~/api/axios";

export const fetchLanguages = async () => {
  let response;

  try {
    response = await axios.get("/languages");
    if (response.data) {
      console.log(response.data);
      return response.data;
    }
  } catch (e) {
    console.log(response);
    return e;
  }
};
