import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { RiMenuFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const { user } = useSelector(state => state.authState);
  const token = sessionStorage.getItem('token');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [window.location.search]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/"}>
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Guru</span>
            <span className="text-slate-800"> Estate</span>
          </h1>
        </Link>

        <form onSubmit={handleSubmit} className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <FaSearch className='text-slate-600 hover:scale-125' />
          </button>
        </form>

        {/* Desktop Navigation */}
        <ul className="hidden sm:flex gap-5">
          <Link to={"/about"} className='hover:scale-125'>
            <li className="text-slate-700">About</li>
          </Link>
          <Link to={"/"} className='hover:scale-125'>
            <li className="text-slate-700">Home</li>
          </Link>
          {token ? (
            <Link to={"/profile"} className='hover:scale-125'>
              <img className='h-7 w-7 rounded-full' src={user.avatar.url} alt="profile" />
            </Link>
          ) : (
            <Link to={"/signin"} className='hover:scale-125'>
              <li className="text-slate-700">Signin</li>
            </Link>
          )}
        </ul>

        {/* Mobile Dropdown */}
        <div className="relative sm:hidden">
          {
            token ? (
              <button onClick={toggleMenu} className='hover:scale-125'>
                <img className='h-7 w-7 rounded-full' src={user.avatar.url} alt="profile" />
              </button>
            ) : (
                <button onClick={toggleMenu} className="text-slate-700 hover:scale-125">
                   <RiMenuFill className='text-2xl' />
                </button>
            )
          }
         

          {isMenuOpen && (
            <ul className={`absolute right-0 bg-white shadow-md rounded mt-1 p-2`}>
              <li>
                <Link to={"/about"} onClick={() => setIsMenuOpen(false)} className='block text-slate-700 p-2'>About</Link>
              </li>
              <li>
                <Link to={"/"} onClick={() => setIsMenuOpen(false)} className='block text-slate-700 p-2'>Home</Link>
              </li>
              <li>
                {token ? (
                  <Link to={"/profile"} onClick={() => setIsMenuOpen(false)} className='block  text-slate-700 p-2'>Profile</Link>
                ) : (
                  <Link to={"/signin"} onClick={() => setIsMenuOpen(false)} className='block text-slate-700 p-2'>Signin</Link>
                )}
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
