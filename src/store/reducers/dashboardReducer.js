import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const getDashboardIndexData = createAsyncThunk(
  "dashboard/getDashboardIndexData",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/order/get-dashboard-data/${userId}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const dashboardReducer = createSlice({
  name: "dashboard",
  initialState: {
    loader: false,
    errorMessage: "",
    successMessage: "",
    recentOrders: [],
    totalOrder: 0,
    pendingOrder: 0,
    cancelledOrder: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardIndexData.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(getDashboardIndexData.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.recentOrders = payload.data.recentOrders;
        state.pendingOrder = payload.data.pendingOrder;
        state.cancelledOrder = payload.data.cancelledOrder;
        state.totalOrder = payload.data.totalOrder;
      });
  },
});
export const { messageClear } = dashboardReducer.actions;
export default dashboardReducer.reducer;
