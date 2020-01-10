import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Registration.css';
import ScrollToTopOnMount from '../../ScrollToTopOnMount';


class Registration extends Component {
    CheckPassword = () =>{
        let pass1 = document.getElementById('input_pass_reg');
        let pass2 = document.getElementById('input_pass2_reg');
        if(pass1.value!==pass2.value){
            alert('Пароли не совпадают.Повторите снова');
            pass1.value = '';
            pass2.value = '';
        }
    }

    render(){
        return(
            <div className="registrationPage">
                <ScrollToTopOnMount />
                <h1>Регистрация</h1>
                <form className="authForm" method="POST">
                <input 
                type="email" 
                id="input_email_reg" 
                name="email" 
                autocomplete="on"
                pattern="^\S+\@\S+\.[a-zA-Z0-9-.]+$" 
                className="authForm_input" value="" placeholder="Email"
                required>
                </input>
                <label for="email"></label>

                <input 
                type="password" 
                id="input_pass_reg" 
                name="pass" 
                min="6"
                className="authForm_input" placeholder="Пароль"
                required>
                </input>
                <label for="pass"></label>

                <input 
                type="password" 
                id="input_pass2_reg" 
                name="pass2"
                min="6" 
                className="authForm_input" placeholder="Пароль еще раз"
                required>
                </input>
                <label for="pass2"></label>
                
                <input 
                type="text" 
                id="input_name_reg"
                name="name"
                pattern="^[A-Za-z]+\s[A-Za-z]+$"
                className="authForm_input" placeholder="Имя"
                required>
                </input>
                <label for="name"></label>


                <button 
                onClick={this.CheckPassword} 
                type="button" 
                className="authForm_button" 
                id="authForm_button_reg">Зарегистрироваться</button>

                <Link to="/user" className="authForm_button">Вход</Link>

                </form>
            </div> 
        )
    }
}

export default Registration;