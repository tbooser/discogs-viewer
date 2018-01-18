import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addItem } from '../actions/actions'
import RenderTracks from './RenderTracks.jsx'

export class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      text: ''
    }
  }

  addItem() {
    this.props.addItem(this.state.text)
        console.log('this.props ADD ITEM-- >> ', this.props)
  }

  getTracks() {
    // this.props.loadTracks()
    console.log('this.props ADD ITEM-- >> ', this.props)
  }

  renderItems() {
    const items  = this.props.app.loadItems.items
    return (
      <ul className='list-group col-sm-4'>
        {
          items.map(item => {
            return (
              <li key={Math.random()}>
                <div className='list-item'>
                  <div>{item.text}</div>
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  }

  render() {
    return (
      <div className="App">
        <h1></h1>
        <div className='form-inline'>
          <div className='form-group'>
            <input className='form-control' placeholder='Add item' onChange={event=> this.setState({text:event.target.value})}>
            </input>
            <button type='button' className='btn btn-success' onClick={() => this.addItem() }>
              Submit
            </button>
          </div>
          { this.renderItems() }
          <RenderTracks />
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

export default connect(mapStateToProps, { addItem })(App)

