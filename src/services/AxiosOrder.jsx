import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://4dd8-2a09-bac1-4360-00-23-409.ngrok-free.app/api",
});

export default instance;
