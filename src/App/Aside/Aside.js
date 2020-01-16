import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import './Aside.css';



class Aside extends Component {

    ChangeFilter = (event) => {
        if(event.target.tagName === "BUTTON"){
            this.props.addFilterToState(event.target.id);
        }
    }

    render(){
    return (
        <div className='aside'>
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
                <Link to="/songs"><button id="all">#вся музыка</button></Link>
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