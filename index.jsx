import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.css"
import UseContext from "./components/UseContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UseContext>
      <App />
    </UseContext>
  </StrictMode>
)