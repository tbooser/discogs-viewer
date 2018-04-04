import React, { Component } from "react";
import { connect } from "react-redux";
import HomepageHeroSectionLeft from "./HomepageHeroSectionLeft";
import HomepageHeroSectionRight from "./HomepageHeroSectionRight";

export class HomepageHeroSectionContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="container my-4">
				<div className="row">
					<div className="col-sm-12 col-md-6">
						<HomepageHeroSectionLeft />
					</div>
					<div className="col-sm-12 col-md-6">
						<HomepageHeroSectionRight />
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

export default connect(mapStateToProps)(HomepageHeroSectionContainer);
