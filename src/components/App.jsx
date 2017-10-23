import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addItem } from '../actions/actions'
import RenderTracks from './RenderTracks.jsx'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      text: ''
    }
  }

  addItem() {
    console.log('this.state.text', this.state.text)
    this.props.addItem(this.state.text)
  }

  renderItems() {
    const { items } = this.props.items
    console.log('this.props --->>>', items)
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
        <h1>App Component</h1>
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
  console.log('state', state)
  return {
    items: state
  }
}

export default connect(mapStateToProps, { addItem })(App)

