import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

export const registerUser = createAsyncThunk(
  "customerAuth/registerUser",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/customer/user-register`, info, {
        withCredentials: true,
      });
      localStorage.setItem("userToken", data.token);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const loginUserCustomer = createAsyncThunk(
  "customerAuth/loginUserCustomer",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/customer/user-login`, info, {
        withCredentials: true,
      });
      localStorage.setItem("userToken", data.token);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserDetail = createAsyncThunk(
  "customerAuth/getUserDetail",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/customer/get-me`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/customer/user-logout", {
        withCredentials: true,
      });
      localStorage.removeItem("userToken");

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
    userInfo: "",
    userId: decodeToken(localStorage.getItem("userToken")),
    token: localStorage.getItem("userToken"),
  },
  reducers: {
    resetUser: (state, _) => {
      state.userInfo = "";
      state.userId = "";
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.token = payload.token;
        state.userId = decodeToken(payload.token);
        toast.success(`Welcome ${payload.data.user.firstName}`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loader = false;
        toast.error(payload.message);
      })
      .addCase(loginUserCustomer.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(loginUserCustomer.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.token = payload.token;
        state.userId = decodeToken(payload.token);
        toast.success(`Welcome back ${payload.data.user.firstName}`);
      })
      .addCase(loginUserCustomer.rejected, (state, { payload }) => {
        state.loader = false;
        toast.error(payload.message);
        // console.log(payload);
      })
      // get user detail
      .addCase(getUserDetail.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(getUserDetail.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.data.userInfo;
      })
      .addCase(getUserDetail.rejected, (state, { payload }) => {
        state.loader = false;
      })
      // logout
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = "";
        toast.success(payload.status);
      });
  },
});
export const { resetUser } = authReducer.actions;
export default authReducer.reducer;
