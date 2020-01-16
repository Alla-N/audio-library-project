import React from 'react';
import './Header.css';
import Logo from './Logo/Logo';
import Search from './Search/Search';
import Login from './Login/Login';
import Navigation from './Navigation/Navigation';



const Header = () => {
    return(
        <div className = 'header'>
        <Logo/>
        <Search/>
        <Navigation/>
        <Login/>
        </div>
    )
}

export default Header;
