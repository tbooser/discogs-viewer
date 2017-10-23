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
	}

	componentDidMount() {
		console.log('componentDidMount', this.props)
		this.props.loadTracks()
	}	

	render() {
		return <h2>RenderTracks Component</h2>
	}
}

function mapStateToProps(state) {
	console.log('render tracks state', state)
	return {
		tracks: state
	}
}

export default connect(mapStateToProps, { loadTracks })(RenderTracks)