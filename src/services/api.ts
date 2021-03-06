import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "content-type": "application/json",
  },
});

export default api;

export const pokeAPI = "https://pokeapi.co/api/v2";
