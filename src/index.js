import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReduxThunk from 'redux-thunk';
import combineReducers from './reducers';
import DiscogsTableContainer from './components/DiscogsTableContainer/index.ts';
import './styles/main.css';

const store = createStore(combineReducers, applyMiddleware(ReduxThunk));
console.log('Store --->>> ', store.getState());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<DiscogsTableContainer />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
