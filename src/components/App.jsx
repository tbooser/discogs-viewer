import React, { Component } from 'react'
import { connect } from 'react-redux'
import RenderRecords from './RenderRecords.jsx'
import Header from './Header'

export class App extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <RenderRecords />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    app: state
  }
}

export default connect(mapStateToProps)(App)

