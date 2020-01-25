import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './User.css';
import ScrollToTopOnMount from '../ScrollToTopOnMount';

class User extends Component {

    handleFormSubmit = () => {
        let inputEmail = document.getElementById('input_email').value;
        let inputPass = document.getElementById('input_pass').value;

        let user = JSON.parse(localStorage.getItem ('user'));

        if(inputEmail === user.email && inputPass === user.password){
            alert ('Вход разрешен')
        }else{
            alert('Почта или пароль введено не верно')
        }
    }


    render(){
        return(
            <div className="userPage">
                <ScrollToTopOnMount />
                <h1>Вход</h1>
                <form className="authForm" onSubmit={this.handleFormSubmit}>
                <input 
                type="email" 
                id="input_email" 
                name="email"
                pattern="^\S+\@\S+\.[a-zA-Z0-9-.]+$"   
                autoComplete="on" 
                className="authForm_input"  placeholder="Email"
                required>
                </input>
                <label htmlFor="email"></label>
                <br/>

                <input 
                type="password" 
                id="input_pass" 
                name="pass"               
                className="authForm_input"  placeholder="Пароль"
                required>
                </input>
                <label htmlFor="pass"></label>
                <br/>
                
                <input type="checkbox" name="remember"></input>
                <label className="checkbox" htmlFor="remember">Запомнить</label>
                <br/>

                <button type="submit" className="authForm_button" id="authForm_buttonSubmit">Войти</button>

                <Link to="/registration" className="authForm_button">Регистрация</Link>

                </form>
            </div>  
        )
    }
}

export default User;