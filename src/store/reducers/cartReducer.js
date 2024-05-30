import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

export const getCustomerCartProducts = createAsyncThunk(
  "cart/getCustomerCartProducts",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/cart/get-customer-cart/${userId}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/cart/add-cart`, id, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProductFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/cart/remove-product-from-cart/${id}`,
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

export const incrementProductQuantity = createAsyncThunk(
  "cart/incrementProductQuantity",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.patch(
        `/cart/increment-product-of-cart/${productId}`,
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
  "cart/decrementProductQuantity",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.patch(
        `/cart/decrement-product-of-cart/${productId}`,
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

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/cart/add-wishlist", info, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getAllMyWishlists = createAsyncThunk(
  "wishlist/getAllMyWishlists",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/cart/get-all-wishlist/${userId}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const removeWishlist = createAsyncThunk(
  "wishlist/removeWishlist",
  async (wishlistId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(`/cart/remove-wishlist/${wishlistId}`, {
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
    card_products: [],
    card_product_count: 0,
    wishlist_count: 0,
    wishlist: [],
    price: 0,
    errorMessage: "",
    successMessage: "",
    shipping_fee: 0,
    outofstock_products: [],
    buy_product_item: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    resetCount: (state, _) => {
      state.wishlist_count = 0;
      state.card_product_count = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.rejected, (state, { payload }) => {
        toast.error(payload.error);
        state.errorMessage = payload.error;
      })
      .addCase(addToCart.fulfilled, (state, { payload }) => {
        state.card_product_count = state.card_product_count + 1;
        toast.success(payload.message);
        state.successMessage = payload.message;
      })
      .addCase(getCustomerCartProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.card_products = payload.card_products;
        state.price = payload.price;
        state.card_product_count = payload.card_product_count;
        state.shipping_fee = payload.shipping_fee;
        state.outofstock_products = payload.outOfStockProduct;
        state.buy_product_item = payload.buy_product_item;
      })
      .addCase(getCustomerCartProducts.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(deleteProductFromCart.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      })
      .addCase(incrementProductQuantity.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      })
      .addCase(decrementProductQuantity.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      })
      .addCase(addToWishlist.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.successMessage = payload.message;
        state.wishlist_count =
          state.wishlist_count > 0 ? state.wishlist_count + 1 : 1;
        toast.success(payload.message);
      })
      .addCase(addToWishlist.rejected, (state, { payload }) => {
        state.loading = false;
        state.errorMessage = payload.message;
        toast.error(payload.error);
      })
      .addCase(getAllMyWishlists.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getAllMyWishlists.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.wishlist = payload.wishlist;
        state.wishlist_count = payload.wishlistCount;
      })
      .addCase(getAllMyWishlists.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(removeWishlist.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(removeWishlist.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.wishlist = state.wishlist.filter(
          (p) => p._id !== payload.wishlistId
        );
        console.log(payload);
        state.wishlist_count = state.wishlist_count - 1;
        toast.success(payload.message);
      })
      .addCase(removeWishlist.rejected, (state, { payload }) => {
        state.loading = false;
      });
  },
});
export const { messageClear, resetCount } = cartReducer.actions;
export default cartReducer.reducer;
