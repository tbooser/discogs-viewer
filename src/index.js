import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import App from './components/App.jsx'
import combineReducers from './reducers'
import './styles/main.css';

const store = createStore(combineReducers, applyMiddleware(ReduxThunk))
console.log('Store --->>> ', store.getState())
// store.subscribe()

ReactDOM.render(
  <Provider store={store}>
  	<App />
  </Provider>,
  	document.getElementById('root')
)
