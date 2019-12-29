import React from 'react';
import './Aside.css';


const Aside = () => {
    return (
        <div className='aside'>
            <div className="filterButtons">
                <button>Новинки</button>
                <button>Сбоники</button>
                <button>Жанры</button>
                <button>Исполнители</button>
                <button>Популярная</button>
                <button>Ретро</button>
                <button>Крутая</button>
                <button>О зиме</button>
                <button>Новый год</button>
                <button>Лучшая</button>
                <button>Подбор музыки</button>
            </div>
            <div className="searchTags">
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

        </div>
    )
}

export default Aside;