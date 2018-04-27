import React, { Component } from "react";
import { connect } from "react-redux";
import YoutubeProgressBar from "./YoutubeProgressBar.jsx";
import * as recordActions from "../../actions/loadRecordsActions";
import { bindActionCreators } from "redux";

let player;

export class Youtube extends Component {
	constructor(props) {
		super(props);
		this.state = {
			player: null,
			paused: false,
			volume: 100,
			currentTimeRounded: 0,
			currentTime: 0,
			duration: 0
		};

		this.pauseVideo = this.pauseVideo.bind(this);
		this.playVideo = this.playVideo.bind(this);
		this.toggleVideoPlay = this.toggleVideoPlay.bind(this);
		this.setVolume = this.setVolume.bind(this);
		this.getDuration = this.getDuration.bind(this);
		this.getCurrentTimeRounded = this.getCurrentTimeRounded.bind(this);
		this.getArtistAndTrackTitle = this.getArtistAndTrackTitle.bind(this);
		this.handleVolumeChange = this.handleVolumeChange.bind(this);
		this.tick = this.tick.bind(this);
		this.getCurrentTime = this.getCurrentTime.bind(this);
		this.getDuration = this.getDuration.bind(this);
	}

	componentDidUpdate() {}

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
		this.tick();
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

	tick() {
		setInterval(() => {
			this.getCurrentTimeRounded();
			this.getCurrentTime();
			this.getDuration();
		}, 1000);
	}

	playVideo() {
		this.state.player.playVideo();
		this.setState({ paused: false });
	}

	pauseVideo() {
		this.state.player.pauseVideo();
		this.setState({ paused: true });
	}

	setVolume(volume) {
		this.state.player.setVolume(volume);
	}

	getCurrentTime() {
		this.setState({ currentTime: this.state.player.getCurrentTime() });
	}

	getDuration() {
		this.setState({ duration: this.state.player.getDuration() });
	}

	getCurrentTimeRounded() {
		this.setState({ currentTimeRounded: Math.floor(this.state.player.getCurrentTime()) });
	}

	getArtistAndTrackTitle() {
		return this.state.player.j.videoData.title;
	}

	handleVolumeChange(event) {
		this.setState({ volume: event.target.value });
		this.setVolume(event.target.value);
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

	render() {
		if (this.state.player) {
			return (
				<div className="container h-100">
					<div className="yt-player-video-info row h-100">
						<div className="col-md-1 my-auto d-flex align-items-center" key={Math.random()}>
							{this.toggleVideoPlay()}
						</div>
						<div className="col-md-5 my-auto d-flex align-items-center" key={Math.random()}>
							{this.state.currentTimeRounded}

							<YoutubeProgressBar
								getCurrentTime={this.state.currentTime}
								getDuration={this.state.duration}
							/>
						</div>
						<div className="col-md-4 my-auto" key={Math.random()}>
							{this.getArtistAndTrackTitle()}
						</div>
						<div className="col-md-2 my-auto d-flex align-items-cente" key={Math.random()}>
							<input type="range" value={this.state.volume} onChange={this.handleVolumeChange} />
						</div>
					</div>

					<div id="yt-player" />
				</div>
			);
		} else {
			return (
				<div className="container h-100">
					<div className="yt-player-video-info row h-100" />
					<div id="yt-player" />
				</div>
			);
		}
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

export default connect(mapStateToProps, mapDispatchToProps)(Youtube);
