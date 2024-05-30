import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";

export const getAllCategories = createAsyncThunk(
  "home/getAllCategories",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/get-categories`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProductsByType = createAsyncThunk(
  "home/getProductsByTypes",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/home/get-products", {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getProductDetail = createAsyncThunk(
  "home/getProductDetail",
  async (slug, { rejectWithValue, fulfillWithValue }) => {
    console.log(slug);
    try {
      const { data } = await api.get(`/home/get-product/${slug}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProductsPriceRange = createAsyncThunk(
  "home/getProductsByPriceRange",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/home/get-products-price-range", {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const queryProduct = createAsyncThunk(
  "home/queryProduct",
  async (query, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/product-query?category=${query.searchCategory}&&rating=${
          query.rating
        }&&lowPrice=${query.low}&&highPrice=${query.high}&&sort=${
          query.sortPrice
        }&&currentPage=${query.currentPage}&&value=${
          query.searchValue ? query.searchValue : ""
        }`,
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

export const customerReviewSend = createAsyncThunk(
  "review/customerReviewSend",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info);
    try {
      const { data } = await api.post(
        "/home/add-customer-product-review",
        info,
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
export const getAllReviews = createAsyncThunk(
  "review/getAllReviews",
  async ({ productId, pageNumber }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/get-all-reviews/${productId}?pageNumber=${pageNumber}`,

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
export const getAllBanners = createAsyncThunk(
  "banners/getAllBanners",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        "/products/get-all-banners",

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

export const homeReducer = createSlice({
  name: "home",
  initialState: {
    isLoading: false,
    categories: [],
    products: [],
    totalProducts: 0,
    parPage: 5,
    latestProduct: [],
    topRatedProduct: [],
    discountProduct: [],
    priceRange: {
      low: 0,
      high: 100,
    },
    product: {},
    categoryRelatedProducts: [],
    sellerRelatedProducts: [],
    errorMessage: "",
    successMessage: "",
    totalReviews: 0,
    ratingReview: [],
    reviews: [],
    banners: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.fulfilled, (state, { payload }) => {
        state.categories = payload.categories;
      })
      .addCase(getProductsByType.fulfilled, (state, { payload }) => {
        state.products = payload.products;
        state.latestProduct = payload.latestProduct;
        state.topRatedProduct = payload.topRatedProduct;
        state.discountProduct = payload.discountProduct;
      })
      .addCase(getProductsPriceRange.fulfilled, (state, { payload }) => {
        state.latestProduct = payload.latestProduct;
        state.priceRange = payload.priceRange;
      })
      .addCase(queryProduct.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(queryProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.products = payload.products;
        state.totalProducts = payload.totalProducts;
        state.parPage = payload.parPage;
      })
      // detailed product
      .addCase(getProductDetail.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getProductDetail.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // state.categories = payload.categories;
        state.product = payload.product;
        state.categoryRelatedProducts = payload.categoryRelatedProducts;
        state.sellerRelatedProducts = payload.sellerRelatedProducts;
      })
      .addCase(getProductDetail.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(customerReviewSend.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(customerReviewSend.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success(payload.message);
        console.log(payload);
      })
      .addCase(customerReviewSend.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.error);
        console.log(payload);
      })

      .addCase(getAllReviews.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getAllReviews.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.reviews = payload.reviews;
        state.totalReviews = payload.totalReview;
        state.ratingReview = payload.ratingReview;
      })
      .addCase(getAllReviews.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.error);
      })
      .addCase(getAllBanners.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getAllBanners.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.banners = payload.getBanners;
      });
  },
});

export default homeReducer.reducer;
