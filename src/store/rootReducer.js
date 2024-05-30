import homeSlice from "./reducers/homeReducer";
import authSlice from "./reducers/authReducer";
import cartSlice from "./reducers/cartReducer";
import orderSlice from "./reducers/orderReducer";
import dashboardSlice from "./reducers/dashboardReducer";
import chatSlice from "./reducers/chatReducer";

const rootReducer = {
  home: homeSlice,
  customerAuth: authSlice,
  cart: cartSlice,
  order: orderSlice,
  dashboard: dashboardSlice,
  chat: chatSlice
};

export default rootReducer;
