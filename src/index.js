import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./_reducer/reducers";
import { BrowserRouter as Router } from 'react-router-dom'
import App from "./App";
import "assets/scss/material-kit-react.scss?v=1.9.0";

const store = createStore(reducers);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
