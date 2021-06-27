import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    return {
      ...config,
      headers: {},
    };
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => (response.data ? response.data : response),
  async (error) => {
    return Promise.reject(error.response.data);
  }
);

const { get, post, put, delete: destroy } = apiClient;
export { get, post, put, destroy };
