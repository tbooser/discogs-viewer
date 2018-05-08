import React, { Component } from "react";
import { connect } from "react-redux";

class YoutubeProgressBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			progressBarWidth: 60,
			ticking: false
		};

		this.progressBar = this.progressBar.bind(this);
		this.getCurrentTime = this.getCurrentTime.bind(this);
		this.getDuration = this.getDuration.bind(this);
		this.updateState = this.updateState.bind(this);
	}

	updateState(width) {
		this.setState({ progressBarWidth: width });
	}

	getCurrentTime() {
		return this.props.getCurrentTime;
	}

	getDuration() {
		return this.props.getDuration;
	}

	progressBar() {
		var playerCurrentTime = this.props.getCurrentTime;
		var playerTotalTime = this.props.getDuration;
		console.log(playerCurrentTime);
		console.log(playerTotalTime);
		var playerTimeDifference = playerCurrentTime / playerTotalTime * 100;
		console.log("Progress bar : ", playerTimeDifference);
		this.setState({ progressBarWidth: playerTimeDifference });
		return playerTimeDifference;
	}

	render() {
		return (
			<div className="progress">
				<div
					className="progress-bar bg-success"
					role="progressbar"
					aria-valuemin="0"
					aria-valuemax="100"
					style={{
						width: `${this.state.progressBarWidth}%`
					}}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		app: state
	};
}

export default connect(mapStateToProps)(YoutubeProgressBar);
