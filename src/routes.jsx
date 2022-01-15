import React from "react";
import { Route } from "react-router-dom";
import DiscogsTableContainer from "./components/DiscogsTableView/DiscogsTableContainer.jsx";
import DiscogsAlbumViewContainer from "./components/DiscogsAlbumView/DiscogsAlbumViewContainer.jsx";

const DiscogsRoutes = () => (
	<div>
		<Route exact path="/" element={<DiscogsTableContainer />} />
		<Route exact path="/discogs-album-view" element={<DiscogsAlbumViewContainer />} />
	</div>
);

export default DiscogsRoutes;