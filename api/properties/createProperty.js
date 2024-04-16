import axios from "~/api/axios";

export const createProperty = async (propertyData) => {
  let response;

  try {
    response = await axios.post("/properties", propertyData);
    if (response.data) {
      console.log(response.data);
      return response.data;
    }
  } catch (e) {
    console.log(response);
    return e;
  }
};
