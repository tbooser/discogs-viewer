import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRecordById } from '../actions/loadRecordsActions'

export class RecordItem extends Component {
	constructor(props){
		super(props)
		this.state = {
			recordList: [''],
			clicked: false,
			currentID: '',
		}
		
		this.setClickId    = this.setClickId.bind(this)
		this.addClickEvent = this.addClickEvent.bind(this)

	}

	setClickId(){
		this.setState({currentID: this.props.id})
		this.addClickEvent()
	}

	addClickEvent(){
		console.log(this.props, 'this.props')
		this.props.handleChange(this.props.id)
	}

	render() {
	  return (
	  	<div className='record-image-container col-sm-3' onClick={this.setClickId} key={Math.random()}>
	    	<img className='record-image' alt='Record' id={this.props.id} src={this.props.imgSrc} />
	    </div>
	  )
	}
}


function mapStateToProps(state) {
	return {
		app: state
	}
}

export default connect(mapStateToProps, { getRecordById })(RecordItem)