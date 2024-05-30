import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

export const registerUserCustomer = createAsyncThunk(
  "customerAuth/registerUserCustomer",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info);
    try {
      const { data } = await api.post(`/customer/register-customer`, info, {
        withCredentials: true,
      });
      localStorage.setItem("customerToken", data.token);

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const loginUserCustomer = createAsyncThunk(
  "customerAuth/loginUserCustomer",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info);
    try {
      const { data } = await api.post(`/customer/login-customer`, info, {
        withCredentials: true,
      });
      localStorage.setItem("customerToken", data.token);

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const decodeToken = (token) => {
  if (token) {
    const userInfo = jwtDecode(token);
    return userInfo;
  } else {
    return "";
  }
};

export const authReducer = createSlice({
  name: "customerAuth",
  initialState: {
    loader: false,
    userInfo: decodeToken(localStorage.getItem("customerToken")),
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    resetUser: (state, _) => {
      state.userInfo = "";
      
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserCustomer.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(registerUserCustomer.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        toast.success(payload.message);
        const userInfo = decodeToken(payload.token);
        state.userInfo = userInfo;
      })
      .addCase(registerUserCustomer.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
        toast.error(payload.error);
      })
      .addCase(loginUserCustomer.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(loginUserCustomer.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        toast.success(payload.message);
        const userInfo = decodeToken(payload.token);
        state.userInfo = userInfo;
      })
      .addCase(loginUserCustomer.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
        toast.error(payload.error);
      });
  },
});
export const { messageClear, resetUser } = authReducer.actions;
export default authReducer.reducer;
