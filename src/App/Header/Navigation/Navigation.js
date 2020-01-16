import React from 'react';
import {Link} from 'react-router-dom';
import './Navigation.css';

const Navigation  = () => {
    return (
        <div className="navigation">
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
        </div>
    );
}

export default Navigation;