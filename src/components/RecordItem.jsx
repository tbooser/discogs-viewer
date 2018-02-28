import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadRecords } from '../actions/loadRecordsActions'

export class RecordItem extends Component {
	constructor(props){
		super(props)
		this.state = {
			recordList: ['']
		}
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(){
		console.log(this)
	}

	render() {
	  return (
	  	<div className='record-image-container col-sm-3' onClick={this.handleClick} key={Math.random()}>
	    	<img className='record-image' alt='IMAGE' src={this.props.imgSrc} />
	    </div>
	  )
	}
}


function mapStateToProps(state) {
	return {
		app: state
	}
}

export default connect(mapStateToProps, { loadRecords })(RecordItem)