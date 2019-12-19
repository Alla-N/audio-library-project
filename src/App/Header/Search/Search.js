import React from 'react';
import './Search.css'


const Search = () => {
    return(
        <div className="search">
        <form>
            <input type="text" placeholder="Поиск по исполнителю и названию трека"/>
            <button type="submit"></button>
        </form>
        </div>
    )
}

export default Search;
