import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addItem } from '../actions/actions'
import RenderRecords from './RenderRecords.jsx'

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

  getRecords() {
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

export default connect(mapStateToProps, { addItem })(App)

