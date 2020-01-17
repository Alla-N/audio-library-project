import React from 'react';
import './Logo.css'
import {Link} from 'react-router-dom';
import logo from './logo.png'


const Logo = () => {
    return(
        <div className="logo">
            <Link to='/'><img src={logo} alt="logo"></img><div>MyMusic</div></Link>
        </div>
    )
}

export default Logo;
