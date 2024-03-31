import axios from "axios";

export const instance = axios.create({
  baseURL:
    "https://ca2c-2a09-bac5-4861-101e-00-19b-133.ngrok-free.app/api",
});

export const instance2 = axios.create({
  baseURL: "http://localhost:8181/api",
});

export const instance3 = axios.create({
  baseURL: "https://a75c-220-247-221-157.ngrok-free.app/api/orders",
});