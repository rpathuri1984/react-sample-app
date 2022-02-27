import React from "react";
import ReactDOM from "react-dom";

import { ColorModeScript } from "@chakra-ui/react";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import * as serviceWorker from "./serviceWorker";
import { RegisterMocks } from "./context/__mocks__/RegisterMocks";

RegisterMocks();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ColorModeScript />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
