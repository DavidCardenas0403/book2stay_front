import axios from "axios";
import { API_URL } from "../CONSTS";

export default axios.create({
  baseURL: API_URL,
});
