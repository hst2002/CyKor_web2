import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lobby from './lobby.jsx';
import Chat from './chat.jsx';

function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App