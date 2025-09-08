
function Header({ }) {

    return (
        <header className="w-full py-4 px-6">
            <nav className="flex flex-col md:flex-row md:justify-between items-center gap-4 text-white text-bold">
                <div>
                    <h2 className='font-bold text-3xl cursor-pointer select-none'>
                        Sign me!
                    </h2>
                </div>
                <div className='flex flex-col gap-5 cursor-pointer select-none'>
                    <p>
                        Sing up!
                    </p>
                </div>
            </nav>
        </header>
    )

}

export default Header;