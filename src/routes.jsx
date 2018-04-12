import React from "react";
import { Route } from "react-router-dom";
import DiscogsTableContainer from "./components/DiscogsTableView/DiscogsTableContainer.jsx";
import DiscogsAlbumViewContainer from "./components/DiscogsAlbumView/DiscogsAlbumViewContainer.jsx";

export default () => (
	<div>
		<Route exact path="/" component={DiscogsTableContainer} />
		<Route exact path="/discogs-album-view" component={DiscogsAlbumViewContainer} />
	</div>
);
