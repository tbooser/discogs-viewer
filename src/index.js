import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReduxThunk from "redux-thunk";
import combineReducers from "./reducers";
import DiscogsTableContainer from "./components/DiscogsTableView/DiscogsTableContainer.jsx";
import DiscogsAlbumViewContainer from "./components/DiscogsAlbumView/DiscogsAlbumViewContainer.jsx";
import "./styles/main.css";

const store = createStore(combineReducers, applyMiddleware(ReduxThunk));
// console.log("Store --->>> ", store.getState());

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<DiscogsTableContainer />} />
				<Route exact path="/discogs-album-view" element={<DiscogsAlbumViewContainer />} />
			</Routes>
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
