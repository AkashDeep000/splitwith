import React from "react";
import ReactDOM from "react-dom/client";
import { CookiesProvider } from 'react-cookie';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <CookiesProvider>
    <App />
  </CookiesProvider>
    </React.StrictMode>
);
