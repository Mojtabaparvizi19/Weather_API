import axios from "axios";

export default axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
  params: {
    units: "metric",
    lat: "",
    lon: "",
    appid: import.meta.env.VITE_API_KEY,

    cnt: 20,
  },
});
