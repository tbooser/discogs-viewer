import React, { Component } from "react";
import { connect } from "react-redux";

let player;

export class Youtube extends Component {
	constructor(props) {
		super(props);
		this.state = {
			player: null
		};
	}

	componentDidUpdate() {
		console.log("this.state ", this.state);
		console.log("video info", this.state.player.getVolume());
		console.log("video info", this.state.player.setVolume());
	}

	componentDidMount() {
		if (!player) {
			player = new Promise(resolve => {
				const tag = document.createElement("script");
				tag.src = "https://www.youtube.com/iframe_api";
				const firstScriptTag = document.getElementsByTagName("script")[0];
				firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
				window.onYouTubeIframeAPIReady = () => resolve(window.YT);
			});
		}
		player.then(YT => {
			this.player = new YT.Player("yt-player", {
				height: this.props.height || 200,
				width: this.props.width || 200,
				videoId: this.props.videoId,
				events: {
					onStateChange: this.onPlayerStateChange,
					onReady: this.onReady
				},
				playerVars: {
					autoplay: 1,
					controls: 1,
					showinfo: 1
				}
			});
		});
	}

	onReady = e => {
		this.setState({
			player: e.target
		});
	};

	onPlayerStateChange = e => {
		if (typeof this.props.onStateChange === "function") {
			this.props.onStateChange(e);
		}
	};

	stopVideo() {
		this.player.stopVideo();
	}

	render() {
		return (
			<section className="youtubeComponent-wrapper">
				<div id="yt-player" />
			</section>
		);
	}
}

function mapStateToProps(state) {
	return {
		app: state
	};
}

export default connect(mapStateToProps)(Youtube);
