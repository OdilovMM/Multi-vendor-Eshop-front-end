import "./index.css";
import React from "react";
import { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./store/index";
import App from "./App";
// import AppCopy from "./AppCopy";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <Provider store={store}>
      <Suspense>
        <App />
        <Toaster
          toastOptions={{
            position: "top-center",
          }}
        />
      </Suspense>
    </Provider>
  </>
);
