import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlayerStatsPage from './components/index';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PlayerStatsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


