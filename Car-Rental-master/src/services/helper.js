import axios from "axios";

const BASE_URL = "https://dorian-opposite-utahraptor.glitch.me/";

export const myAxios = axios.create({
  baseURL: BASE_URL,
})
