import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import logo from '../../../assets/logo.png'; 

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    window.location.reload(); // Optional: to force navbar re-render on logout
  };

  const getDashboardPath = () => {
    if (user?.role === 'startup') return '/fundraise-dashboard';
    if (user?.role === 'investor') return '/invest-dashboard';
    return '/';
  };

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <span onClick={() => navigate('/')} className='logo-container'>
          <img src={logo} alt="logo" className='logo' />
        </span>
      </div>

      <ul className='nav-menu'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/startups'>Startups</Link></li>
        <li><Link to='/investor'>Investors</Link></li>
        <li><Link to='/about'>About</Link></li>
        {user && (
          <li><Link to='/chatbox'>Messages</Link></li>
        )}
        
        {user && (
          <li>
            <Link to={getDashboardPath()}>Dashboard</Link>
          </li>
        )}
      </ul>

      <div className='nav-register'>
        {user ? (
          <>
            <span className="welcome-text">Hi, {user.firstName || user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to='/signin'><button>Sign In</button></Link>
            <button className='nav-register-button' onClick={() => navigate('/register')}>
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
