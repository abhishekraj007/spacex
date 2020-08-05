import axios from "axios";

export const fetchData = async (query) => {
  const BASE_URL = "https://api.spacexdata.com/v3/launches";
  const url = query ? `${BASE_URL}${query}` : BASE_URL;

  try {
    let res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log("An error occured: ", error);
  }
};
