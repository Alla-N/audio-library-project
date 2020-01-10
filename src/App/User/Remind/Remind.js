import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Remind.css';
import ScrollToTopOnMount from '../../ScrollToTopOnMount';


class Remind extends Component {
    render(){
        return(
            <div className="remindPage">
                <ScrollToTopOnMount />
                <h1>Забыл пароль</h1>
                <form className="authForm" method="POST">
                <input 
                type="email" 
                id="input_email" 
                name="email" 
                autocomplete="on" 
                className="authForm_input" required="" value="" placeholder="Email">
                </input>



                <button type="submit" className="authForm_button" id="authForm_buttonReg">Хочу новый пароль</button>

                <Link to="/user" className="authForm_button">Вход</Link>

                </form>
            </div>
        )
    }
}

export default Remind;