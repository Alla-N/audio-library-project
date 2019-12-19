import React from 'react';
import './Header.css';
import Logo from './Logo/Logo';
import Search from './Search/Search';
import Login from './Login/Login'



const Header = () => {
    return(
        <div className = 'header'>
        <Logo/>
        <Search/>
        <Login/>
        </div>
    )
}

export default Header;
