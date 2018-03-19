import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRecordById } from '../actions/loadRecordsActions'
import RecordInfo from './RecordInfo'

export class RecordItem extends Component {
	constructor(props){
		super(props)
		this.state = {
			recordList: [''],
			clicked: false,
			currentID: '',
			hovering: false
		}
		
		this.setClickId      = this.setClickId.bind(this)
		this.addClickEvent   = this.addClickEvent.bind(this)

	}

	setClickId(){
		this.setState({ currentID: this.props.id })
		this.addClickEvent()
	}

	addClickEvent(){
		console.log(this.props, 'this.props')
	}

	handleMouseover(){
		this.setState({ hovering: true })
	}

	handleMouseOut(){
		this.setState({ hovering: false })
	}

	render() {
	  return (
	  	<div className='record-image-container col-sm-3' onClick={this.setClickId} key={Math.random()}>
  			<div className='record-details-container'>
	  			<img className='record-image' 
	  				onClick={ this.handleMouseover.bind(this) } 
	  				onMouseLeave={ this.handleMouseOut.bind(this) } 
	  				src={ this.props.imgSrc } 
	  				alt='Record' 
	  				id={ this.props.id } 
	  				/>
					{
						this.state.hovering === true
							? <RecordInfo
									artistName={this.props.artistName}
									recordTitle={this.props.recordTitle}
									label={this.props.label}
									year={this.props.year}
								/>
							: null
					}
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

export default connect(mapStateToProps, { getRecordById })(RecordItem)