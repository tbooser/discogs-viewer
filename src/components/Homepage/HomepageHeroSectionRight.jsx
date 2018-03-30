import React, { Component } from 'react'
import { connect } from 'react-redux'
import githubLogo from '../../images/GitHub-Mark-120px.png'
import linkedInLogo from '../../images/In-Black-121px-R.png'
import vinylRecordImg from '../../images/Vinyl-Record.jpg'

export class HomepageHeroSectionRight extends Component {
	constructor(props){
		super(props)
		this.state = {

		}
	}

	render() {
		return (
			<div className='hero-section-right'>
				<div className='container'>
					<div className='row'>
						<div className='col-sm-12 col-md-6 mb-3 portfolio-item'>
							<a className='portfolio-item-image' href='/discogs-view' target='_blank'>
								<img src={vinylRecordImg}/>
							</a>
						</div>	
						<div className='col-sm-12 col-md-6 mb-3 portfolio-item'>
							<a className='portfolio-item-image'>
								<img src='http://via.placeholder.com/250x250'/>
							</a>
						</div>	
						<div className='col-sm-12 col-md-6 mb-3 portfolio-item'>
							<a className='portfolio-item-image'>
								<img src='http://via.placeholder.com/250x250'/>
							</a>
						</div>	
						<div className='col-sm-12 col-md-6 mb-3 portfolio-item'>
							<a className='portfolio-item-image'>
								<img src='http://via.placeholder.com/250x250'/>
							</a>
						</div>					
					</div>
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

export default connect(mapStateToProps)(HomepageHeroSectionRight)