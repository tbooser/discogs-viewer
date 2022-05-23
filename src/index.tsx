import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import youtubeVideosReducer from './reducers/Youtube';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DiscogsTableContainer from './components/DiscogsTableContainer';
import './styles/main.css';

const store = configureStore({
  reducer: {
    youtubeVideosReducer,
  },
});

// non-null assertion (!)
const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DiscogsTableContainer />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
