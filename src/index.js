import React from 'react'
import ReactDOM from 'react-dom'
// import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import App from './components/App.jsx'
import reducer from './reducers'

const store = createStore(reducer, applyMiddleware(ReduxThunk))

ReactDOM.render(
  <Provider store={store}>
  	<App />
  </Provider>,
  	document.getElementById('root')
)
