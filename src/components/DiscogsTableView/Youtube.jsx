import React, { Component } from "react";
import { connect } from "react-redux";
import audioSVG from "../../images/loading-spinner/audio.svg";

let player;

export class Youtube extends Component {
	constructor(props) {
		super(props);
		this.state = {
			player: null,
			paused: false,
			volume: 100
		};

		this.loadInfo = this.loadInfo.bind(this);
		this.pauseVideo = this.pauseVideo.bind(this);
		this.playVideo = this.playVideo.bind(this);
		this.toggleVideoPlay = this.toggleVideoPlay.bind(this);
		this.setVolume = this.setVolume.bind(this);
		this.getDuration = this.getDuration.bind(this);
		this.getCurrentTime = this.getCurrentTime.bind(this);
		this.getArtistAndTrackTitle = this.getArtistAndTrackTitle.bind(this);
		this.handleVolumeChange = this.handleVolumeChange.bind(this);
	}

	componentDidUpdate() {
		console.log("State -> ", this.state);
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
		// this.setState({ volume: event.target.value });
	}

	getDuration() {
		this.state.player.getDuration();
	}

	getCurrentTime() {
		this.state.player.getCurrentTime();
	}

	getArtistAndTrackTitle() {
		return this.state.player.j.videoData.title;
	}

	handleVolumeChange(event) {
		console.log(event.target.value);
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

	loadInfo() {
		if (this.state.player) {
			return [
				<div className="col-md-1 my-auto" key={Math.random()}>
					<img alt="audio-svg" className="audio-svg" src={audioSVG} />
				</div>,
				<div className="col-md-3 my-auto" key={Math.random()}>
					{this.getArtistAndTrackTitle()}
				</div>,
				<div className="col-md-2 my-auto d-flex align-items-center" key={Math.random()}>
					{this.toggleVideoPlay()}
				</div>,
				<div className="col-md-4 my-auto d-flex align-items-cente" key={Math.random()}>
					Future location of progress bar
				</div>,
				<div className="col-md-2 my-auto d-flex align-items-cente" key={Math.random()}>
					<input type="range" value={this.state.volume} onChange={this.handleVolumeChange} />
				</div>
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
