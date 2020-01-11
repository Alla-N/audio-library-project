import React from 'react';
import {Link} from 'react-router-dom';
import './Aside.css';
import newSongs from './img/newSongs.png';
import collections from './img/collections.png';
import genres from './img/genres.png';
import artists from './img/artists.png';
import top from './img/top.png';
import retro from './img/retro.png';
import cool from './img/cool.png';
import winter from './img/winter.png';
import newYear from './img/newYear.png';
import best from './img/best.png';
import selection from './img/selection.png';


const Aside = () => {
    return (
        <div className='aside'>
            <div className="filterButtons">
                <button id='newSongs'>
                    <img src={newSongs} alt=""/>
                    Новинки
                </button>
                <button id='collections'>
                    <img src={collections} alt=""/>
                    Сборники
                </button>
                <button id='genres'>
                    <img src={genres} alt=""/>
                    Жанры
                </button>
                <button id='artists'>
                    <img src={artists} alt=""/>
                    Исполнители
                </button>
                <button id='top'>
                    <img src={top} alt=""/>
                    Популярная
                </button>
                <button id='retro'>
                    <img src={retro} alt=""/>
                    Ретро
                </button>
                <button id='cool'>
                    <img src={cool} alt=""/>
                    Крутая
                </button>
                <button id='winter'>
                    <img src={winter} alt=""/>
                    О зиме
                </button>
                <button id='newYear'>
                    <img src={newYear} alt=""/>
                    Новый год
                </button>
                <button id='best'>
                    <img src={best} alt=""/>
                    Лучшая
                </button>
                <button id='selection'>
                    <img src={selection} alt=""/>
                    Подбор музыки
                </button>
            </div>
            <div className="searchTags">
            <h3>Музыка по жанрам</h3>
                <button>#поп</button>
                <button>#клубная</button>
                <button>#шансон</button>
                <button>#рэп</button>
                <button>#рок</button>
                <button>#trance</button>
                <button>#dance</button>
                <button>#релакс</button>
                <button>#дабстеп</button>
                <button>#house</button>
                <button>#метал</button>
                <button>#еще...</button>
            </div>
            <div className="contactsButton">
                <Link to="/contacts">Контакты</Link>
            </div>

        </div>
    )
}

export default Aside;