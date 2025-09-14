import { Routes, Route } from 'react-router-dom';

import './App.css'
import Header from './components/Header';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <Header />

      <p className='text-white'>
        This is the home page
      </p>

      <Routes>
        <Route
          path="/register"
          element={
            <Register />
          }
        />
        <Route
          path="/login"
          element={
            <Login />
          }
        />
      </Routes>
    </div>
  );
};


export default App