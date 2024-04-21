import axios from "axios";

export const instance = axios.create({
  baseURL:
    "https://api-log.tharuksha.com/api",
});

export const instance2 = axios.create({
  baseURL: "http://localhost:8080",
});



export const instance3 = axios.create({
  baseURL: "https://a75c-220-247-221-157.ngrok-free.app/api/orders",
});