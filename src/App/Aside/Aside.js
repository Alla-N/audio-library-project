import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
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


class Aside extends Component {

    ChangeFilter = (event) => {
        if(event.target.tagName === "BUTTON"){
            this.props.addFilterToState(event.target.id);
        }
    }

    render(){
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
            <div className="searchTags" onClick={this.ChangeFilter}>
            <h3>Музыка по жанрам</h3>
                <Link to="/songs/pop"><button id="pop">#поп</button></Link>
                <Link to="/songs/club"><button id="club">#клубная</button></Link>
                <Link to="/songs/chanson"><button id="chanson">#шансон</button></Link>
                <Link to="/songs/rap"><button id="rap">#рэп</button></Link>
                <Link to="/songs/rok"><button id="rok">#рок</button></Link>
                <Link to="/songs/trance"><button id="trance">#trance</button></Link>
                <Link to="/songs/dance"><button id="dance">#dance</button></Link>
                <Link to="/songs/relax"><button id="relax">#релакс</button></Link>
                <Link to="/songs/dubstep"><button id="dubstep">#дабстеп</button></Link>
                <Link to="/songs/house"><button id="house">#house</button></Link>
                <Link to="/songs/metal"><button id="metal">#метал</button></Link>
            </div>
            <div className="contactsButton">
                <Link to="/contacts">Контакты</Link>
            </div>

        </div>
    )
    }
}

const mapStateToProps = (state)=> ({
    filter: state.filteredSongs.filter,
})

const mapDispatchToProps = (dispatch) => ({
    addFilterToState: (filter) => dispatch({
        type:'ADD_FILTER',
        filter: filter,
    })
})

export default connect(mapStateToProps, mapDispatchToProps) (Aside);