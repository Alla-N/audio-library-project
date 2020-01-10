import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './User.css';
import ScrollToTopOnMount from '../ScrollToTopOnMount';

class User extends Component {
    render(){
        return(
            <div className="userPage">
                <ScrollToTopOnMount />
                <h1>Вход</h1>
                <form className="authForm" method="POST">
                <input 
                type="email" 
                id="input_email" 
                name="email" 
                autocomplete="on" 
                className="authForm_input" required="" value="" placeholder="Email">
                </input>

                <input 
                type="password" 
                id="input_pass" 
                name="pass" 
                className="authForm_input" required="" placeholder="Пароль">
                </input>
                
                <input type="checkbox" name="remember"></input>
                <label className="checkbox" for="remember">Запомнить</label>
                <br/>

                <button type="submit" className="authForm_button" id="authForm_buttonSubmit">Войти</button>

                <Link to="/registration" className="authForm_button">Регистрация</Link>
                <Link to="/remind" className="authForm_button">Забыл пароль</Link>

                </form>
            </div>  
        )
    }
}

export default User;