import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/API";

// GET ALL APPOINTMENTS
export const getAllAppointments = createAsyncThunk(
  "appointment/getAllAppointments",
  async (_, thunkApi) => {
    //underscore here mean no arguments passed
    try {
      const res = await API.get("/appointment/get-all");
      return res?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Error occured in getting all appointments";

      // Reject with error message
      return thunkApi.rejectWithValue(message);
    }
  }
);

// // GET APPOINTMENT DETAILS
export const getAppointmentDetails = createAsyncThunk(
  "appointment/getAppointmentDetails",
  async (id, thunkApi) => {
    try {
      const res = await API.get(`/appointment/get-details/${id}`);
      return res?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Error occured in getting appointment details";

      // Reject with error message
      return thunkApi.rejectWithValue(message);
    }
  }
);

// // ADD NEW DOCTOR
// export const addNewDoctor = createAsyncThunk(
//   "doctor/addNewDoctor",
//   async (formData, thunkApi) => {
//     try {
//       const res = await API.post("/doctor/add", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       return res?.data;
//     } catch (error) {
//       if (error.response?.status === 400 && error.response?.data?.errors) {
//         // Format validation errors
//         const validationErrors = error.response.data.errors
//           .map((err) => `${err.field}: ${err.message}`)
//           .join(", ");

//         return thunkApi.rejectWithValue(
//           `Validation failed: ${validationErrors}`
//         );
//       }

//       const message =
//         error?.response?.data?.message ||
//         error.message ||
//         "Error occured in adding new doctor";

//       // Reject with error message
//       return thunkApi.rejectWithValue(message);
//     }
//   }
// );

// // UPDATE DOCTOR
// export const updateDoctor = createAsyncThunk(
//   "doctor/updateDoctor",
//   async ({ id, formData }, thunkApi) => {
//     try {
//       const res = await API.patch(`/doctor/update/${id}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       return res?.data;
//     } catch (error) {
//       const message =
//         error?.response?.data?.message ||
//         error.message ||
//         "Error occured in updating doctor";

//       // Reject with error message
//       return thunkApi.rejectWithValue(message);
//     }
//   }
// );

// // DELETE DOCTOR
// export const deleteDoctor = createAsyncThunk(
//   "doctor/deleteDoctor",
//   async ({ id }, thunkApi) => {
//     try {
//       const res = await API.delete(`/doctor/delete/${id}`);
//       return res?.data;
//     } catch (error) {
//       const message =
//         error?.response?.data?.message ||
//         error.message ||
//         "Error occured in deleting doctor";

//       // Reject with error message
//       return thunkApi.rejectWithValue(message);
//     }
//   }
// );

// // UPDATE DOCTOR STATUS
// export const updateStatus = createAsyncThunk(
//   "doctor/updateStatus",
//   async ({ id, availableStatus }, thunkApi) => {
//     try {
//       const res = await API.patch(
//         `/doctor/update-status/${id}`,
//         availableStatus
//       );
//       return res?.data;
//     } catch (error) {
//       const message =
//         error?.response?.data?.message ||
//         error.message ||
//         "Error occured in updating doctor status";

//       // Reject with error message
//       return thunkApi.rejectWithValue(message);
//     }
//   }
// );
