/**
 * API instance with interceptors for handling auth tokens.
 */

import axios from "axios";

/**
 * Create an instance of axios with a base URL from environment variables.
 */
const API = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });

/**
 * Request interceptor to add Authorization header with token from localStorage.
 */
API.interceptors.request.use(
  async (config) => {
    try {
      // Retrieve app data from localStorage
      const localData = await localStorage.getItem("appData");
      const appData = JSON.parse(localData);
      if (appData) {
        config.headers.Authorization = ` ${appData?.token}`; //Bearer
      }
    } catch (error) {
      console.log(error);
    }
    return config;
  },
  (error) => {
    // Reject the request if there's an error
    return Promise.reject(error);
  }
);

export default API;
