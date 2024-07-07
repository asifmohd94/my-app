import React from 'react';
import './header.css'; 
import { useSelector } from 'react-redux';

const Header = () => {

  const {items, displayName, isUserLoggedIn} = useSelector((store: any) => store.user)
  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          {/* Logo (Replace with your logo image or text) */}
          <div className="logo">
            <a href="/">
            <img style={{height:"50px"}}  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu_74ZidAHYi7PEtxsZgIE1vEZwdnPSxzxRA&s'></img>
            </a>
          </div>

          {/* Navigation Menu */}
          <nav className="nav">
            <ul className="nav-list">
              <li className="nav-item">
                <a href="/">Home</a>
              </li>
              <li className="nav-item">
                <a href="/about">About</a>
              </li>
              <li className="nav-item">
                <a href="/services">Services</a>
              </li>
              <li className="nav-item">
                <a href="/contact">Contact</a>
              </li>
              <li className="nav-item">
                <a href="/profile">{isUserLoggedIn ? displayName : "User Name"}</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
