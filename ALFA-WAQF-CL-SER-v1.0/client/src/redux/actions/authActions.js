/**
 * Async thunk for handling user routes.
 */
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/API";

// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkApi) => {
    try {
      // Make POST request to login endpoint api/v1/user/login
      // Sending data (email and password) to the server for authentication.
      // Using POST to keep sensitive data in the request body, not in URL params.
      const res = await API.post("/user/login", { email, password });
      // Store login response data (e.g., token, user info) in localStorage
      // This data is used for subsequent authenticated requests.
      localStorage.setItem("appData", JSON.stringify(res?.data));
      // Return login data to update Redux state
      return res?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Login error occured";

      // Reject with error message
      return thunkApi.rejectWithValue(message);
    }
  }
);

// REGISTER
export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, thunkApi) => {
    try {
      const res = await API.post("/user/register", { name, email, password });
      // Return register data to update Redux state
      return res?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Register error occured";

      // Reject with error message
      return thunkApi.rejectWithValue(message);
    }
  }
);

// GET USER DATA

export const getUserData = createAsyncThunk("auth/getUserData", () => {
  const localData = localStorage.getItem("appData");
  if (!localData) return thunkApi.fulfillWithValue(null);
  const appData = JSON.parse(localData);
  return appData?.user;
});

// LOAD / GET TOKEN
export const loadToken = createAsyncThunk("auth/loadToken", () => {
  const localData = localStorage.getItem("appData");
  const appData = JSON.parse(localData);
  return appData?.token;
});
