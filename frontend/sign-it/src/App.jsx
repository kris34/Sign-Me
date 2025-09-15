import { Routes, Route } from 'react-router-dom';

import './App.css'
import Header from './components/Header';
import Register from './pages/Register';
import Login from './pages/Login';
import api from './api/api';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFirstName } from './store/slices/sessionSlice';

function App() {
  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  async function getUserCredentials() {
    try {
      const response = await api.get('/api/users/me', { withCredentials: true });

      if (response.status !== 200) {
        setError('Error retriving user session!');
      };

      const firstName = response?.data?.data?.first_name;
      const email = response?.data?.data?.email;


      dispatch(setFirstName(firstName))
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUserCredentials();
  }, [])


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