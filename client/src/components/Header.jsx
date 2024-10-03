import React, { useEffect, useState } from 'react'
import {FaSearch} from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {

  const {user} = useSelector(state => state.authState)
  const token = sessionStorage.getItem('token')
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-slate-200 shadow-md ">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/"}>
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Guru</span>
            <span className="text-slate-800"> Estate</span>
          </h1>
        </Link>
        <form    onSubmit={handleSubmit} className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
         <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form>
        <ul className="flex gap-5 ">
          <Link to={"/about"}>
            <li className="hidden sm:inline hover:underline text-slate-700">
              About
            </li>
          </Link>

          <Link to={"/"}>
            <li className="hidden sm:inline hover:underline text-slate-700">
              Home
            </li>
          </Link>

          {token ? (
            <Link to={"/profile"}>
             <img className='h-7 w-7 rounded-full' src={user.avatar.url} alt="profile" />
            </Link>
          ) : (
            <Link to={"/signin"}>
              <li className=" hover:underline text-slate-700">Signin</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header