import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadRecords } from '../actions/loadRecordsActions'
import RecordItem from './RecordItem'

export class RenderRecords extends Component {
	constructor(props){
		super(props)
		this.state = {
			recordList: ['']
		}
	}	

	componentDidMount() {
		this.props.loadRecords()
	}	

  renderRecords() {
    let records  = this.props.app.loadRecords.records
    console.log('records', records)
    for (var i = 0; i < records.length; i++){
    	if (records.length > 1 && records[i].response !== undefined){
    		return (
          records[i].response.map(item => {
            return (
            	<RecordItem imgSrc={item.basic_information.cover_image} id={item.id} key={Math.random()}/>
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
 					{ this.renderRecords() }
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

export default connect(mapStateToProps, { loadRecords })(RenderRecords)