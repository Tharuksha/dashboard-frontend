import axios from "axios";

export const instance = axios.create({
  baseURL:
    "https://api-ad.tharuksha.com/api",
});

export const instance2 = axios.create({
  baseURL: "https://api-ad.tharuksha.com",
});
