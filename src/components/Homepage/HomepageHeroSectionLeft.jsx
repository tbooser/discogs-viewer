import React, { Component } from 'react'
import { connect } from 'react-redux'
import githubLogo from '../../images/GitHub-Mark-120px.png'
import linkedInLogo from '../../images/In-Black-121px-R.png'

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
					<a href='/discogsView'>
						<span>About</span>
					</a>
				</div>
				<div className='nav-link'>
					<a href='/discogsView'>
						<span>Projects</span>
					</a>
				</div>
				<div className='nav-link'>
					<a href='/discogsView'>
						<span>Contact</span>
					</a>
				</div>
				<div>
					<a href='https://github.com/tbooser'>
						<img className='github-logo' src={githubLogo}/>
					</a>
					<a href='https://www.linkedin.com/in/timothy-booser'>
						<img className='linkedin-logo' src={linkedInLogo}/>
					</a>
					<a href='https://www.codewars.com/users/tbooser/'>
						<img className='codewars-logo' src='https://www.codewars.com/users/tbooser/badges/small'/>
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