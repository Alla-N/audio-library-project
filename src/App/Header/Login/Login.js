import React from 'react';
import {Link} from 'react-router-dom';
import './Login.css';



const Login = () => {
    return(
        <div className="logIn">
            <Link to="/user"><button>Войти в аккаунт</button></Link>
        </div>
    )
}

export default Login;
