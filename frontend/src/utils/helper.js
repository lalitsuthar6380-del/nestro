import axios from "axios";

// Apne backend ke port ke hisab se URL likho.
// Agar backend 5000 par chal raha hai to ye use karo.
const client = axios.create({
  baseURL: "http://localhost:5000/api/",
  timeout: 10000,
  withCredentials: true 
});

console.log("Axios Base URL:", client.defaults.baseURL);

const createSlug = (text = "") => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

export { client, createSlug };