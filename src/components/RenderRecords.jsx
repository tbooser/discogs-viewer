import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import RecordItem from './RecordItem'
import LoadingSpinner from './LoadingSpinner'
import * as recordActions from '../actions/loadRecordsActions'

export class RenderRecords extends Component {
	constructor(props){
		super(props)
		this.state = {
			recordList: [''],
			hovering: false,
			isFetching: true,
		}

		this.loadingSpinner   = this.loadingSpinner.bind(this)
		this.openYoutubeVideo = this.openYoutubeVideo.bind(this)
	}	

	componentWillMount() {
		this.loadingSpinner()
	}

	componentDidMount() {
		this.props.actions.recordActions.getRecordsByUsername()
		this.state.isFetching = false
		console.log(this.props, 'dfsdf')
	}	

	componentDidUpdate(prevProps){
		console.log(this.props, 'Updated')

		// let currentVideoIndex = this.props.app.loadYoutubeVideos.videos.length
		// let currentVideo = this.props.app.loadYoutubeVideos.videos[currentVideoIndex - 1].response.videos[0].uri
		// this.openYoutubeVideo(currentVideo)
	}

	openYoutubeVideo(video){
		var newTab = window.open(video, '_blank')
		newTab.focus()
	}

	loadingSpinner(){
		if(this.state.isFetching) {
			return(
				<LoadingSpinner />
				)
		} else {
			return
		}
	}

  renderRecords() {
    let records  = this.props.app.loadRecordsByUsername.records
    console.log('records ', records)
    for (var i = 0; i < records.length; i++){
    	if (records.length > 1 && records[i].response !== undefined){
    		return (
          records[i].response.map(item => {
            return (
            	<RecordItem 
            	  id={item.id}
            	  key={Math.random()}
            	  year={item.basic_information.year}
            	  recordTitle={item.basic_information.title} 
            	  imgSrc={item.basic_information.cover_image} 
            	  label={item.basic_information.labels[0].name}
            	  resource_url={item.basic_information.resource_url} 
            	  artistName={item.basic_information.artists[0].name}
            		handleChange={this.props.actions.recordActions.getRecordById} 
            		getYoutubeVideo={this.props.actions.recordActions.fetchYoutubeVideos}
  						/>
            )
          }) 
	      )
    	}
    }
  }

	render() {
		return (
 			<div className='container record-list-container'>
 				<div className='row'>
					{ this.loadingSpinner() } 				
 					{ this.renderRecords() }
 				</div>
			</div>
		)
	}

}

function mapStateToProps(state) {
	return {
		app: state,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			recordActions: bindActionCreators(recordActions, dispatch)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps )(RenderRecords)