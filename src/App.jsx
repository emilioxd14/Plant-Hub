import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HubView from './views/HubView';
import DetailView from './views/DetailView';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HubView />} />
      <Route path="/plant/:id" element={<DetailView />} />
    </Routes>
  );
}

export default App;
