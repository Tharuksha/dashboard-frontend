import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://f6e1-2402-1f00-8001-203e-26d7-bf13-d63b-1.ngrok-free.app/api",
});

export default instance;
