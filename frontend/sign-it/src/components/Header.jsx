import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { setEmail, setFirstName } from '../store/slices/sessionSlice';

function Header({ }) {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const firstName = useSelector((state) => state.session.firstName);
    const session = useSelector((state) => state.session);

    const handleLogout = async (params) => {
        try {
            await api.post('/api/users/logout', {}, { withCredentials: true });

            dispatch(setEmail(null));
            dispatch(setFirstName(null));

            navigate('/')
        }
        catch (err) {

            console.log(err);
        };
    };

    return (
        <header className="w-full fixed top-0 left-0 z-50 text-white shadow">
            <nav className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
                <h2
                    onClick={() => navigate('/')}
                    className="font-bold text-3xl cursor-pointer select-none p-2 active:scale-95"
                >
                    Sign me!
                </h2>

                <div className="flex gap-4 items-center">
                    {!firstName ? (
                        <>
                            <p
                                onClick={() => navigate('/register')}
                                className="cursor-pointer select-none hover:bg-gray-500 p-2 rounded active:scale-95"
                            >
                                Sign up
                            </p>
                            <p
                                onClick={() => navigate('/login')}
                                className="cursor-pointer select-none hover:bg-gray-500 p-2 rounded active:scale-95"
                            >
                                Log in
                            </p>
                        </>
                    ) : (
                        <div className="flex flex-col items-end">
                            <p>Welcome, {firstName}</p>
                            <p className="cursor-pointer select-none" onClick={handleLogout}>
                                Logout
                            </p>
                        </div>
                    )}
                </div>
            </nav>
        </header>

    );
}
export default Header;
