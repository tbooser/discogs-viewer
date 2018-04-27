import React, { Component } from "react";
import { connect } from "react-redux";

class YoutubeProgressBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			progressBarWidth: 0,
			ticking: false
		};

		this.tick = this.tick.bind(this);
		this.stopTick = this.stopTick.bind(this);
		this.progressBar = this.progressBar.bind(this);
		this.getCurrentTime = this.getCurrentTime.bind(this);
		this.getDuration = this.getDuration.bind(this);
		this.updateState = this.updateState.bind(this);
	}

	componentDidMount() {
		this.tick();
	}

	componentWillUnmount() {
		this.stopTick();
	}

	tick() {
		this.ticker = setInterval(() => {
			this.progressBar();
		}, 2000);
	}

	stopTick() {
		clearInterval(this.ticker);
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
		this.setState({ progressBarWidth: playerTimeDifference });
		console.log("Progress bar : ", playerTimeDifference);
		return playerTimeDifference;
	}

	render() {
		return (
			<div
				className="progress progress-bar"
				style={{
					width: `${this.state.progressBarWidth}%`
				}}
			/>
		);
	}
}

function mapStateToProps(state) {
	return {
		app: state
	};
}

export default connect(mapStateToProps)(YoutubeProgressBar);
