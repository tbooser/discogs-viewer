import React, { Component } from "react";

class YoutubeProgressBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPlayerWidth: this.props.currentPlayerWidth
		};
	}

	componentWillReceiveProps(props) {
		this.setState({ currentPlayerWidth: this.props.currentPlayerWidth });
	}

	render() {
		return (
			<div
				className="progress progress-bar"
				style={{
					width: `${this.state.currentPlayerWidth}%`
				}}
			/>
		);
	}
}

export default YoutubeProgressBar;
