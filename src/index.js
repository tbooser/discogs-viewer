import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ReduxThunk from 'redux-thunk'
import App from './components/App.jsx'
import DiscogsDataContainer from './components/DiscogsDataContainer.jsx'
import HomepageContainer from './components/Homepage/HomepageContainer.jsx'
import combineReducers from './reducers'
import './styles/main.css';

const store = createStore(combineReducers, applyMiddleware(ReduxThunk))
// console.log('Store --->>> ', store.getState())

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={HomepageContainer}/>
        <Route exact path='/discogsView' component={App}/>
        <Route exact path='/discogsData' component={DiscogsDataContainer}/>
      </Switch>
    </BrowserRouter>
  </Provider>,
    document.getElementById('root')
)
