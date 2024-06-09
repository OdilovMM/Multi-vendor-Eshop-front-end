import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";


export const incrementProductQuantity = createAsyncThunk(
  "incr/incrementProductQuantity",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.patch(
        `/customer/increment-cart-quantity/${productId}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const decrementProductQuantity = createAsyncThunk(
  "dec/decrementProductQuantity",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.patch(
        `/customer/decrement-cart-quantity/${productId}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addRemoveWishlist = createAsyncThunk(
  "wishlist/addRemoveWishlist",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        "/customer/add-remove-wishlist",
        { productId },
        {
          withCredentials: true,
        }
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const addRemoveCart = createAsyncThunk(
  "cart/addRemoveCart",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/customer/add-remove-cart", productId, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMyWishlist = createAsyncThunk(
  "wishlist/getMyWishlist",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/customer/get-my-wishlist`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getMyCart = createAsyncThunk(
  "cart/getMyCart",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/customer/get-my-cart`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const cartReducer = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    success: false,
    wishlist_count: 0,
    wishlist: [],
    cardProducts: [],
    price: 0,
    cardProductCount: 0,
    shippingFee: 0,
    outOfStockProducts: [],
    buyProductItem: 0,

 
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    resetCount: (state, _) => {
      state.wishlist_count = "";
      state.cardProductCount = "";
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(incrementProductQuantity.fulfilled, (state, { payload }) => {
        state.success = true;
      })
      .addCase(decrementProductQuantity.fulfilled, (state, { payload }) => {
        state.success = true;
      })
      // add ti wishlist and remove from wishlist
      .addCase(addRemoveWishlist.pending, (state, { payload }) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(addRemoveWishlist.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;

        if (payload.data.isSaved === false) {
          state.wishlist = state.wishlist.filter(
            (item) => item._id !== payload.data.savedWishlist._id
          );
        } else {
          state.wishlist.push(payload.data.savedWishlist);
        }
      })
      .addCase(addRemoveWishlist.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload.message);
        state.success = false;
      })
      // get all my wishlist
      .addCase(getMyWishlist.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getMyWishlist.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.wishlist = payload.data.wishlistArray;
        state.wishlist_count = payload.data.wishlistArrayCount;
      })
      .addCase(getMyWishlist.rejected, (state, { payload }) => {
        state.loading = false;
      })
      // add to cart and remove from cart
      .addCase(addRemoveCart.pending, (state, { payload }) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(addRemoveCart.fulfilled, (state, { payload }) => {
        state.loading = false;
        toast.success(payload.status);
        state.success = true;
        if (payload.data.isSaved === false) {
          state.cardProducts = state.cardProducts.filter(
            (item) => item._id !== payload.data.savedCart._id
          );
        } else {
          state.cardProducts.push(payload.data.savedCart);
        }
      })
      .addCase(addRemoveCart.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload.message);
        state.success = false;
      })
      // Get my cart products
      .addCase(getMyCart.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getMyCart.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.cardProducts = payload.data.cardProducts;
        state.price = payload.data.price;
        state.cardProductCount = payload.data.cardProductCount;
        state.shippingFee = payload.data.shippingFee;
        state.outOfStockProducts = payload.data.outOfStockProduct;
        state.buyProductItem = payload.data.buyProductItem;
      })
      .addCase(getMyCart.rejected, (state, { payload }) => {
        state.loading = false;
      });
  },
});
export const { messageClear, resetCount } = cartReducer.actions;
export default cartReducer.reducer;
