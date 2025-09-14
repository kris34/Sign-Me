import { useState } from "react";
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function Register() {
    const dispatch = useDispatch();

    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: '',
        repeat_password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const navigate = useNavigate();

    const register = async (e) => {
        try {
            e.preventDefault();

            const isFieldEmpty = Object.values(formData).some(field => !field);

            if (isFieldEmpty) {
                setError("Some fields are empty!");
                return;
            };

            if (formData?.password !== formData?.repeat_password) {
                setError('Passwords do not match!');
                return;
            };

            if (formData?.password?.length < 10) {
                setError('Password must be at least 10 charakters long!');
                return;
            };

            const response = await api.post('/api/users/register', {
                email: formData.email,
                firstName: formData.firstName,
                lastName: formData.lastName,
                password: formData.password,
                repeatPassword: formData.repeat_password
            }, { withCredentials: true });

            if (response?.status !== 200) {
                setError('An error occured while registering!');
                return;
            };

            navigate('/');
            setError(null);
        } catch (err) {
            console.log(err);
        };
    };

    return (
        <div className="flex flex-col items-center text-white">
            <h2 className='text-2xl'>Create an account</h2>
            <form onSubmit={register} className="p-8 rounded-lg w-full max-w-md gap-5 flex flex-col">
                <div className="flex flex-col py-2 px-2 gap-2">
                    <label>📧 E-mail</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="rounded border border-gray-600 focus:outline-none px-2 py-1"
                        required
                    />
                </div>
                <div className="flex flex-col py-2 px-2 gap-2">
                    <label>👤 First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="rounded border border-gray-600 focus:outline-none px-2 py-1"
                        required
                    />
                </div>
                <div className="flex flex-col py-2 px-2 gap-2">
                    <label>👥 Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
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

                <div className="flex flex-col py-2 px-2 gap-2">
                    <label>🔁🔒 Repeat Password</label>
                    <input
                        type="password"
                        name="repeat_password"
                        value={formData.repeat_password}
                        onChange={handleChange}
                        className="rounded border border-gray-600 focus:outline-none px-2 py-1"
                        required
                    />
                </div>
                <button type="submit" className="font-bold active:scale-95 cursor-pointer bg-none">
                    🚀 Register
                </button>

                <div className='text-red-500 text-center'>
                    <p>
                        {error && error}
                    </p>
                </div>

            </form>
        </div>
    );
};