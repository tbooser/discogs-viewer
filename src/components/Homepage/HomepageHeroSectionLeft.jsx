import React, { Component } from 'react'
import { connect } from 'react-redux'

export class HomepageHeroSectionLeft extends Component {
	constructor(props){
		super(props)
		this.state = {

		}
	}

	render() {
		return (
			<div className='hero-section-left'>
				<div className='nav-link'>
					<a href='/discogs-view'>
						<span>About</span>
					</a>
				</div>
				<div className='nav-link'>
					<a href='/discogs-view'>
						<span>Projects</span>
					</a>
				</div>
				<div className='nav-link'>
					<a href='/discogs-view'>
						<span>Contact</span>
					</a>
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

export default connect(mapStateToProps)(HomepageHeroSectionLeft)