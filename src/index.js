import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Switch } from "react-router-dom";
import ReduxThunk from "redux-thunk";
import combineReducers from "./reducers";
import Routes from "./routes";
import "./styles/main.css";

const store = createStore(combineReducers, applyMiddleware(ReduxThunk));
// console.log('Store --->>> ', store.getState())

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Routes />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
