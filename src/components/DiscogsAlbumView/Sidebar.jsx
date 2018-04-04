import React from "react";

export default function Sidebar() {
	return (
		<div className="col-sm-12 col-lg-3">
			<div className="sidebar">
				<div className="card">
					<div className="card-body">
						<a href="/discogs-table-view">
							{" "}
							<button type="button" className="text-center btn btn-link">
								Go to table view
							</button>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
