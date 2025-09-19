import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Register from './pages/Register';
import Login from './pages/Login';
import api from './api/api';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFirstName } from './store/slices/sessionSlice';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';

function App() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  async function getUserCredentials() {
    try {
      const response = await api.get('/api/users/me', {
        withCredentials: true,
      });

      if (response.status !== 200) {
        setError('Error retriving user session!');
      }

      const firstName = response?.data?.data?.first_name;
      dispatch(setFirstName(firstName));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUserCredentials();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-26">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </div>


  );
}

export default App;
