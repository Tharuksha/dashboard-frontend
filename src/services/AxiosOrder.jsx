import axios from "axios";

export const instance = axios.create({
  baseURL:
    "http://api-log.tharuksha.com/api",
});

export const instance2 = axios.create({
  baseURL: "api-ad.tharuksha.com/api",
});

export const instance3 = axios.create({
  baseURL: "https://a75c-220-247-221-157.ngrok-free.app/api/orders",
});