import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

export default function Login() {
    const [error, setError] = useState('Invalid e-mail or password!');

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const login = async (e) => {
        try {
            e.preventDefault();

            if (!formData.email || !formData.password) {
                setError('Invalid e-mail or password!');
                return;
            };

            if (!formData.email && !formData.password) {
                setError('Invalid email and password!');
                return;
            };

            const res = await api.post('/api/users/login', { email: formData.email, password: formData.password }, { withCredentials: true });

            if (res.status !== 200) {
                setError('Error logging in!');
                return;
            };

            setError(null);
            navigate('/');
        }
        catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex flex-col items-center text-white">
            <h2 className='text-2xl'>Log in</h2>
            <form onSubmit={(e) => login(e)} className="p-8 rounded-lg w-full max-w-md gap-5 flex flex-col">
                <div className="flex flex-col py-2 px-2 gap-2">
                    <label>📧 E-Mail</label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="rounded border border-gray-600 focus:outline-none px-2 py-1"
                        required
                    />
                </div>
                <div className="flex flex-col py-2 px-2 gap-2">
                    <label>🔒 Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="rounded border border-gray-600 focus:outline-none px-2 py-1"
                        required
                    />
                </div>
                <button type="submit" className="font-bold active:scale-95 cursor-pointer bg-none">
                    🚀 Login
                </button>

                <div className='text-center text-red-500'>
                    <p>
                        {error && error}
                    </p>
                </div>
            </form>
        </div>
    )

};