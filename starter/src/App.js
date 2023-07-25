import './App.css';

import { Routes, Route } from 'react-router-dom';

import MainPage from './MainPage';
import SearchPage from './SearchPage';

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
