import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getRecordsByUsername } from '../actions/loadRecordsActions'
import { getRecordById } from '../actions/loadRecordsActions'
import RecordItem from './RecordItem'
import * as recordActions from '../actions/loadRecordsActions'

export class RenderRecords extends Component {
	constructor(props){
		super(props)
		this.state = {
			recordList: [''],
			hovering: false
		}
	}	

	componentDidMount() {
		this.props.actions.recordActions.getRecordsByUsername()
		console.log(this.props, 'thidassd')
	}	

  renderRecords() {
    let records  = this.props.app.loadRecordsByUsername.records
    for (var i = 0; i < records.length; i++){
    	if (records.length > 1 && records[i].response !== undefined){
    		return (
          records[i].response.map(item => {
          	if(item.basic_information.cover_image === 'https://img.discogs.com/images/spacer.gif'){
          		item.basic_information.cover_image = 'https://en.wikipedia.org/wiki/Phonograph_record#/media/File:12in-Vinyl-LP-Record-Angle.jpg'
          	}
            return (
            	<RecordItem 
            		handleChange={this.props.actions.recordActions.getRecordById} 
            		recordTitle={item.basic_information.title}
            		artistName={item.basic_information.artists[0].name}
  							imgSrc={item.basic_information.cover_image} 
  							label={item.basic_information.labels[0].name}
  							year={item.basic_information.year} 
  							id={item.id} 
  							key={Math.random()}
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