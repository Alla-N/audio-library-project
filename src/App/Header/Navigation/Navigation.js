import React from 'react';
import {Link} from 'react-router-dom';
import './Navigation.css';
import menu from "./menu.png";

const Navigation  = () => {
    return (
        <div className="navigation">
            <ul className="hidden_menu">
            <li className="hidden_menu_li">
                <img src={menu} alt="menu" className="hidden_menu_img" />
            <ul className="topMenu">
                <li>
                <Link to="/">Главная</Link>
                </li>
                <li>
                <Link to="/playlist">Плейлист</Link>
                </li>
                <li>
                <Link to="/favorites">Избранное</Link>
                </li>
                <li>
                О компании ↴
                <ul className="subMenu">
                    <li>
                    <Link to="/information">Информация</Link>
                    </li>
                    <li>
                    <Link to="/contacts">Контакты</Link>
                    </li>
                </ul>
                </li>
            </ul>
            </li>
            </ul>
        </div>
    );
}

export default Navigation;