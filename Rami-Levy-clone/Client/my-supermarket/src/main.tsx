import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify"; // Import from react-toastify
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import "./App.css";
import { store } from "./app/store";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
        <ToastContainer /> {/* Place the ToastContainer here */}
      </React.StrictMode>
    </Provider>
  );
} else {
  console.error('Root element with id "root" not found.');
}
