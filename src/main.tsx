import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import "@mantine/core/styles.layer.css";
import "./styles.scss";
import { MantineProvider } from "@mantine/core";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <MantineProvider
      theme={{
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <Router>
        <App />
      </Router>
    </MantineProvider>
  </Provider>
);
