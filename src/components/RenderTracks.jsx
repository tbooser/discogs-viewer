import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadTracks } from '../actions/actions'

export class RenderTracks extends Component {
	constructor(props){
		super(props)
		this.state = {
			tracks: ['']
		}
	}	

	loadTracks(){
		this.props.loadTracks()
		console.log('this.props ', this.props)
	}

	componentDidMount() {
				this.loadTracks()
	}	

	 componentWillMount() {

  }

	render() {
		return (
			<div>

			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		tracks: state
	}
}

export default connect(mapStateToProps, { loadTracks })(RenderTracks)