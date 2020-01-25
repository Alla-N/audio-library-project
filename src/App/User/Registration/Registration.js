import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Registration.css';
import ScrollToTopOnMount from '../../ScrollToTopOnMount';



class Registration extends Component {
    
    checkPassword = () =>{
        let pass1 = document.getElementById('input_pass_reg');
        let pass2 = document.getElementById('input_pass2_reg');
        if(pass1.value===pass2.value){
            this.setState({
                isPassEqual: true,
            });
        }else{
            this.setState({
                isPassEqual: false,
            });
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState( prevState => ({ 
            user : 
            {
                ...prevState.user, [name]: value
            }
        }));

        console.log(value)

    }

    
    handleFormSubmit = (event) => {

        event.preventDefault();
        let user = {
            name: this.state.user.name,
            email: this.state.user.email,
            password: this.state.user.password,
        }

        if(this.state.isPassEqual){
            localStorage.setItem('user', JSON.stringify(user));
            alert("Вы зарегистрированы")
        }else{
            let input1 = document.getElementById('input_pass_reg');
            let input2 = document.getElementById('input_pass2_reg');
            alert("Пароли не совпадают. Повторите еще раз");
            this.setState({ 
                user: {
                password: '',
                password2: '',
            },
            });
            input1.value = '';
            input2.value = '';
        }
    } 


    handleClearForm = (e) => {

        e.preventDefault();
        this.setState({ 
            user: {
            name: '',
            email: '',
            password: '',
            password2: '',
        },
        })
    }



    constructor(props) {
        super(props);
        this.state = {
            passEqual: false,
            user:{},
        };
    }

    render(){
        return(
            <div className="registrationPage">
                <ScrollToTopOnMount />

                <h1>Регистрация</h1>

                <form className="authForm" onSubmit={this.handleFormSubmit}>
                <input 
                onChange = {this.handleInputChange} 
                value={this.state.user.email}
                type="email" 
                id="input_email_reg" 
                name="email" 
                autoComplete="on"
                pattern="[a-zA-Z0-9-.]+@[a-zA-Z0-9-.]+.[a-zA-Z0-9-.]+" 
                className="authForm_input" placeholder="Введите Email"
                required>
                </input>
                <label htmlFor="email"></label>
                <br/>

                <input 
                onChange = {this.handleInputChange} 
                value={this.state.user.password}
                type="password" 
                id="input_pass_reg" 
                name="password" 
                autoComplete="on"
                pattern="\d+"
                className="authForm_input" 
                placeholder="Введите пароль(от 6 до 10 символов)"
                required>
                </input>
                <label htmlFor="pass"></label>
                <br/>

                <input 
                onChange={this.checkPassword}
                value={this.state.user.password2}
                type="password" 
                id="input_pass2_reg" 
                name="password2"
                autoComplete="on"
                pattern="\d+"
                className="authForm_input" 
                placeholder="Повторите пароль"
                required>
                </input>
                <label htmlFor="pass2"></label>
                {this.state.isPassEqual ? <div className="resultTrue">Пароли совпадают</div> : <div className="resultFalse">Пароли не совпадают</div>}
                <br/>
                
                <input 
                onChange = {this.handleInputChange}
                value={this.state.user.name} 
                type="text" 
                id="input_name_reg"
                name="name"
                pattern="^[A-Za-z ]+$"
                className="authForm_input" 
                placeholder="Введите имя"
                required>
                </input>
                <label htmlFor="name"></label>
                <br/>

                <button 
                onClick = {this.handleClearForm}
                type="reset"
                id="input_reset_reg">
                    Сбросить
                </button>
                <br/>


                <button 
                type="submit" 
                className="authForm_button" 
                id="authForm_button_reg">Зарегистрироваться</button>

                <Link to="/user" className="authForm_button">Вход</Link>

                </form>
            </div> 
        )
    }
}

export default Registration;