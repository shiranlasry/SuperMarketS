import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { store } from "./app/store";
import Layout from "./views/layouts/Layout";
import { ToastContainer } from "react-bootstrap";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
      <ToastContainer />
    </Provider>
  );
} else {
  console.error('Root element with id "root" not found.');
}
