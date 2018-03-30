import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as d3 from "d3";

export class DiscogsDataContainer extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div>
            D3 PAGE
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

export default connect(mapStateToProps)(DiscogsDataContainer)