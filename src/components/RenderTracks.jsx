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

	loadTracks(){
		this.props.loadTracks()
		console.log('this.props RENDER TRACKS ', this.props)
	}

	componentDidMount() {
		this.loadTracks()
	}	

  renderItems() {
    const tracks  = this.props.app.loadTracks.tracks
    console.log('tracks ', tracks)
    return (
      <ul className='list-group col-sm-4'>
        {
          tracks.map(item => {
            return (
              <li key={Math.random()}>
                <div className='list-item'>
                  <div>{item.instance_id}</div>
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  }

	render() {
		return (
			<div>
        <button type='button' className='btn btn-success' onClick={() => this.renderItems() }>
          Tracks
        </button>
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