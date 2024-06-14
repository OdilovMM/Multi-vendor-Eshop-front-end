import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";

export const getAllCategories = createAsyncThunk(
  "home/getAllCategories",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/category/get-all-categories`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getHomeProductsLandingPage = createAsyncThunk(
  "home/getHomeProductsLandingPage",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/products/get-home-products", {
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
    try {
      const { data } = await api.get(`/products/get-product-detail/${slug}`, {
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
      const { data } = await api.get("/products/get-products-by-price-range", {
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
        `/products/product-query?category=${query.searchCategory}&&rating=${
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
    try {
      const { data } = await api.post(
        "/products/add-customer-product-review",
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
        `/products/get-all-reviews/${productId}?pageNumber=${pageNumber}`,

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
      const { data } = await api.get("/banner/get-all-banners", {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getProductsByTypeProps = createAsyncThunk(
  "home/getProductByTypeProps",
  async ({ type }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/products/${type}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const homeReducer = createSlice({
  name: "home",
  initialState: {
    bannerLoading: false,
    isLoading: false,
    topRated: [],
    newArrivals: [],
    featuredProducts: [],
    categories: [],
    products: [],
    totalProducts: 0,
    parPage: 5,
    latestProduct: [],
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
      .addCase(getProductsByTypeProps.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getProductsByTypeProps.fulfilled, (state, { payload }) => {
        state.featuredProducts = payload.data.products;
        state.isLoading = false;
      })
      .addCase(getProductsByTypeProps.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(getAllCategories.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, { payload }) => {
        state.categories = payload.categories;
        state.isLoading = false;
      })
      .addCase(getAllCategories.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(getHomeProductsLandingPage.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getHomeProductsLandingPage.fulfilled, (state, { payload }) => {
        state.products = payload.data.products;
        state.topRated = payload.data.topRatedProducts;
        state.newArrivals = payload.data.newArrivals;
        state.isLoading = false;
      })
      .addCase(getHomeProductsLandingPage.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(getProductsPriceRange.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getProductsPriceRange.fulfilled, (state, { payload }) => {
        state.latestProduct = payload.data.latestProduct;
        state.priceRange = payload.data.priceRange;
        state.isLoading = false;
      })
      //
      .addCase(getProductsPriceRange.rejected, (state, { payload }) => {
        state.isLoading = false;
      })

      .addCase(queryProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.products = payload.data.products;
        state.totalProducts = payload.data.totalProducts;
        state.parPage = payload.data.parPage;
      })
      // detailed product
      .addCase(getProductDetail.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getProductDetail.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // state.categories = payload.categories;
        state.product = payload.data.product;
        state.categoryRelatedProducts = payload.data.categoryRelatedProducts;
        state.sellerRelatedProducts = payload.data.sellerRelatedProducts;
      })
      .addCase(getProductDetail.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(customerReviewSend.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(customerReviewSend.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // toast.success(payload.message);
      })
      .addCase(customerReviewSend.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.error);
      })

      .addCase(getAllReviews.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getAllReviews.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.reviews = payload.data.reviews;
        state.totalReviews = payload.data.totalReview;
        state.ratingReview = payload.data.ratingReview;
      })
      .addCase(getAllReviews.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.error);
      })
      .addCase(getAllBanners.pending, (state, { payload }) => {
        state.isLoading = true;
        state.bannerLoading = true;
      })
      .addCase(getAllBanners.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.bannerLoading = false;
        state.banners = payload.data.banners;
      });
  },
});

export default homeReducer.reducer;
