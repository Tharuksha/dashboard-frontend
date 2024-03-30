import axios from "axios";

export const instance = axios.create({
  baseURL:
    "https://ccfb-2402-1f00-8001-203e-26d7-bf13-d63b-1.ngrok-free.app/api",
});

export const instance2 = axios.create({
  baseURL: "https://3864-2402-1f00-8001-203e-26d7-bf13-d63b-1.ngrok-free.app/api",
});

export const instance3 = axios.create({
  baseURL: "http://localhost:8282/api/orders",
});