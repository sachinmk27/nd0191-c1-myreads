import './App.css';

import { Routes, Route } from 'react-router-dom';

import MainPage from './containers/MainPage';
import SearchPage from './containers/SearchPage';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </div>
  );
}

export default App;
