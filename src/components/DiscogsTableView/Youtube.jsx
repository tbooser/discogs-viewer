import React, { Component } from "react";
import { connect } from "react-redux";

let player;

export class Youtube extends Component {
	constructor(props) {
		super(props);
		this.state = {
			player: null,
			paused: false,
			volume: null
		};

		this.loadInfo = this.loadInfo.bind(this);
		this.pauseVideo = this.pauseVideo.bind(this);
		this.playVideo = this.playVideo.bind(this);
		this.toggleVideoPlay = this.toggleVideoPlay.bind(this);
		this.setVolume = this.setVolume.bind(this);
		this.getDuration = this.getDuration.bind(this);
		this.getArtistAndTrackTitle = this.getArtistAndTrackTitle.bind(this);
	}

	componentDidUpdate() {
		console.log("did update", this.state);
		console.log("video info", this.state.player.getVolume());
		console.log("video info", this.state.player.setVolume());
	}

	componentDidMount() {
		console.log("did mount", this.state);
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
				height: 0.01,
				width: 0.01,
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

	playVideo() {
		this.state.player.playVideo();
		this.setState({ paused: false });
	}

	pauseVideo() {
		this.state.player.pauseVideo();
		this.setState({ paused: true });
	}

	setVolume() {
		this.state.player.setVolume();
		this.setState({ volume: this.state.player.getVolume });
	}

	getDuration() {
		this.state.player.getDuration();
	}

	getArtistAndTrackTitle() {
		return this.state.player.j.videoData.title;
	}

	toggleVideoPlay() {
		if (this.state.paused) {
			return (
				<i className="material-icons music-player-button" onClick={this.playVideo}>
					play_arrow
				</i>
			);
		} else {
			return (
				<i className="material-icons music-player-button" onClick={this.pauseVideo}>
					pause
				</i>
			);
		}
	}

	loadInfo() {
		if (this.state.player) {
			return [
				<div className="col md-3 my-auto" key={Math.random()}>
					{this.getArtistAndTrackTitle()}
				</div>,
				<div className="col md-3 my-auto d-flex align-items-center" key={Math.random()}>
					{this.toggleVideoPlay()}
				</div>,
				<div className="col md-6" key={Math.random()} />
			];
		}
	}

	render() {
		return (
			<div className="container h-100">
				<div className="yt-player-video-info row h-100">{this.loadInfo()}</div>
				<div id="yt-player" />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		app: state
	};
}

export default connect(mapStateToProps)(Youtube);
