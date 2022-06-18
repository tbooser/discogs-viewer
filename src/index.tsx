import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
import DiscogsDataContextProvider from './context/DiscogsDataProvider';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DiscogsTableContainer from './components/DiscogsTableContainer';
import './styles/main.css';
import youtubeVideosReducer from './reducers/Youtube';
import requestSuccessfulReducer from './reducers/RequestState';
import EmptyComponent from './components/EmptyComponent';

const store = configureStore({
  reducer: {
    youtubeVideosReducer,
    requestSuccessfulReducer,
  },
});

// non-null assertion (!)
const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <DiscogsDataContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmptyComponent />} />
      </Routes>
    </BrowserRouter>
  </DiscogsDataContextProvider>
);
