import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as recordActions from "../../actions/loadRecordsActions";

export class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="col-sm-12 col-lg-3">
				<div className="sidebar">
					<div className="card">
						<div className="text-center card-body">
							<a href="/discogs-album-view">
								<button type="button" className="text-center btn btn-link">
									Go to album view
								</button>
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		app: state
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			recordActions: bindActionCreators(recordActions, dispatch)
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
