import React, { Component } from "react";
import { connect } from "react-redux";
// import YoutubeProgressBar from "./YoutubeProgressBar.jsx";
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
		this.getCurrentTimeRounded = this.getCurrentTimeRounded.bind(this);
		this.getArtistAndTrackTitle = this.getArtistAndTrackTitle.bind(this);
		this.handleVolumeChange = this.handleVolumeChange.bind(this);
		this.getCurrentTime = this.getCurrentTime.bind(this);
		this.getDuration = this.getDuration.bind(this);
		this.formatTime = this.formatTime.bind(this);
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

	setVolume(volume) {
		this.state.player.setVolume(volume);
	}

	getCurrentTime() {
		this.setState({ currentTime: this.state.player.getCurrentTime() });
	}

	getDuration() {
		this.setState({ duration: this.state.player.getDuration() });
	}

	formatTime(time) {
		if (time / 60 >= 1) {
			return (time = time / 60 + ":" + time);
		}
	}

	getCurrentTimeRounded() {
		let time = Math.floor(this.state.player.getCurrentTime());
		this.props.actions.recordActions.tickYoutubeProgressBar(time);
		this.setState({ currentTimeRounded: time });
	}

	getArtistAndTrackTitle() {
		const videoData = this.state.player.getVideoData();
		const { title } = videoData;
		return title;
	}

	handleVolumeChange(event) {
		this.setState({ volume: event.target.value });
		this.setVolume(event.target.value);
	}

	toggleVideoPlay() {
		if (this.state.paused) {
			return (
				<i
					className="material-icons music-player-button"
					onClick={this.playVideo}
				>
					play_arrow
				</i>
			);
		} else {
			return (
				<i
					className="material-icons music-player-button"
					onClick={this.pauseVideo}
				>
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
						<div className=" col-md-1 my-auto" key={Math.random()}>
							<img
								alt="music-bar-record-album-cover"
								className="music-bar-item-image"
								src={this.props.app.loadYoutubeVideos.currentImage}
							/>
						</div>
						<div className="col-md-3 my-auto" key={Math.random()}>
							{this.getArtistAndTrackTitle()}
						</div>
						<div
							className="offset-md-1 col-md-1 my-auto d-flex align-items-center"
							key={Math.random()}
						>
							{this.toggleVideoPlay()}
						</div>
						<div
							className="offset-md-2 col-md-3 my-auto d-flex align-items-cente"
							key={Math.random()}
						>
							<input
								type="range"
								value={this.state.volume}
								onChange={this.handleVolumeChange}
							/>
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
