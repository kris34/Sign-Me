import { Routes, Route } from 'react-router-dom';

import './App.css'
import Header from './components/Header';
import Register from './pages/Register';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/register"
          element={
            <Register />
          }
        />
      </Routes>
    </div>
  );
};


export default App