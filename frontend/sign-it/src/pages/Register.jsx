import React, { useState } from "react";
import api from '../api/api';

export default function Register() {
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: '',
        repeat_password: ''
    });

    // Update form data when input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const register = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/api/users/register', {
                email: formData.email,
                firstName: formData.firstName,
                lastName: formData.lastName
            });
            console.log("User registered:", res.data);
        } catch (err) {
            console.log(err);
        }
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
            </form>
        </div>
    );
}
