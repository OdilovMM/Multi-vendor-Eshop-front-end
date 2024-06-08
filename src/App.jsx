import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  About,
  AddedProductCart,
  Blog,
  CategoryProducts,
  Contact,
  Home,
  LoginPage,
  ProductDetail,
  RegisterPage,
  ShippingPage,
  Shop,
  SearchPage,
  PaymentPage,
  DashboardPage,
  HomeProfile,
  MyOrderPage,
  WishlistPage,
  ConfirmOrder,
  FeaturedProd,
  ProfileInfo,
} from "./pages";
import { MainLayout } from "./layout";
import ProtectedRoute from "./utils/ProtectedRoute";
import { OrderDetails } from "./components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyCart, getMyWishlist } from "./store/reducers/cartReducer";
import { getUserDetail } from "./store/reducers/authReducer";

const App = () => {
  const dispatch = useDispatch();
  

  const { userId } = useSelector((state) => state.customerAuth);
  const { success } = useSelector((state) => state.cart);

  useEffect(() => {
    if (userId) {
      dispatch(getUserDetail());
      dispatch(getMyWishlist());
      dispatch(getMyCart());
    } else {
      return;
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(getMyWishlist());
    }
  }, [dispatch, success]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="shop" element={<Shop />} />
          <Route path="featured/products/:type" element={<FeaturedProd />} />
          <Route path="blog" element={<Blog />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="my-cart" element={<AddedProductCart />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="shipping" element={<ShippingPage />} />
          <Route path="confirm?" element={<ConfirmOrder />} />
          <Route path="product/details/:slug" element={<ProductDetail />} />
          <Route path="products/search?" element={<SearchPage />} />
          <Route path="products?" element={<CategoryProducts />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          >
            <Route index element={<HomeProfile />} />
            <Route path="my-orders" element={<MyOrderPage />} />
            <Route path="my-wishlist" element={<WishlistPage />} />
            <Route path="my-profile" element={<ProfileInfo />} />
            <Route path="order/details/:orderId" element={<OrderDetails />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
