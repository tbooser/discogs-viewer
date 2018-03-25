import React, { Component } from 'react'
import { connect } from 'react-redux'

export class HomepageHeroSectionRight extends Component {
	constructor(props){
		super(props)
		this.state = {

		}
	}

	render() {
		return (
			<div className='hero-section-right'>
				hero-section-right
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
    app: state,
  }
}

export default connect(mapStateToProps)(HomepageHeroSectionRight)