import homeSlice from "./reducers/homeReducer";
import authSlice from "./reducers/authReducer";
import cartSlice from "./reducers/cartReducer";
import orderSlice from "./reducers/orderReducer";
import dashboardSlice from "./reducers/dashboardReducer";

const rootReducer = {
  home: homeSlice,
  customerAuth: authSlice,
  cart: cartSlice,
  order: orderSlice,
  dashboard: dashboardSlice,
};

export default rootReducer;
