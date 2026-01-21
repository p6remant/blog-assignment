import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { useAuthStore } from "@/store/auth.store";
import { handleApiError } from "./apiError";

const BASE_URL = "https://jsonplaceholder.typicode.com";

const client: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError = handleApiError(error);
    return Promise.reject(apiError);
  }
);

async function GET<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  try {
    const response: AxiosResponse<T> = await client.get(url, config);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

async function POST<T, P = unknown>(
  url: string,
  payload?: P,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response: AxiosResponse<T> = await client.post(url, payload, config);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

async function PUT<T, P = unknown>(
  url: string,
  payload?: P,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response: AxiosResponse<T> = await client.put(url, payload, config);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

async function DELETE<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  try {
    const response: AxiosResponse<T> = await client.delete(url, config);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export const apiClient = {
  GET,
  POST,
  PUT,
  DELETE,
};
