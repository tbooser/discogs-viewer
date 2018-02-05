import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadTracks } from '../actions/loadTracksActions'

export class RenderTracks extends Component {
	constructor(props){
		super(props)
		this.state = {
			trackList: ['']
		}
	}	

	componentDidMount() {
		this.props.loadTracks()
	}	

  renderItems() {
    const tracks  = this.props.app.loadTracks.tracks
    for (var i = 0; i < tracks.length; i++){
    	if (tracks.length > 1 && tracks[i].response !== undefined){
    		console.log('Data -> ', tracks[i].response)
    		return (
          tracks[i].response.map(item => {
          	var counter = 1;
            return (
            	<div className='record-image-container col-sm-3' key={Math.random()}>
              	<img className='record-image' src={item.basic_information.cover_image} />
              </div>
            )
          })
	      )
    	}
    }
  }

	render() {
		return (
 			<div className='container'>
 				<div className='row'>
 					{ this.renderItems() }
 				</div>
			</div>
		)
	}

}

function mapStateToProps(state) {
	return {
		app: state
	}
}

export default connect(mapStateToProps, { loadTracks })(RenderTracks)