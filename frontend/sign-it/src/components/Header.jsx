import { useLocation, useNavigate } from 'react-router-dom';

function Header({ }) {

    const navigate = useNavigate();

    return (
        <header className="w-full py-4 px-6">
            <nav className="flex flex space-between md:flex-row justify-between items-center gap-4 text-white text-bold">
                <div>
                    <h2 onClick={() => { navigate('/') }} className='font-bold text-3xl cursor-pointer select-none p-2 active:scale-95'>
                        Sign me!
                    </h2>
                </div>
                <div className='flex gap-5'>
                    <div onClick={() => navigate('/register')} className='flex flex-col gap-5 cursor-pointer select-none hover:bg-gray-500 p-2 rounded active:scale-95'>
                        <p>
                            Sign up
                        </p>
                    </div>
                    <div onClick={() => navigate('/login')} className='flex flex-col gap-5 cursor-pointer select-none hover:bg-gray-500 p-2 rounded active:scale-95'>
                        <p>
                            Log in
                        </p>
                    </div>
                </div>
            </nav>
        </header>
    );
};
export default Header;