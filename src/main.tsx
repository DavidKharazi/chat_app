import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import "@mantine/core/styles.layer.css";
import "./styles.scss";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <Router>
        <App />
      </Router>
    </MantineProvider>
  </React.StrictMode>
);
