import React, {Component} from 'react';
import './TopSongs.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {songs} from '../../songs';
import Song from '../../Song/Song';

class TopSongs extends Component {

    componentDidMount = () => {
        this.changeAlbumState();
    }

// click на кнопку "см.все"
    onClickAllButton = () => {
        this.changeFilterState();
    }

// передать в стейт информацию о текущем альбоме
    changeAlbumState = () =>{
        let currentAlbum = songs.sort(function(a,b){return b.likes-a.likes}).slice(0,6);
        this.props.addAlbum (currentAlbum);
    }

//поменять фильтр на "all" при переходе на все песни, если ранее был записан другой фильтр
    changeFilterState = () =>{
        this.props.addFilterToState("all");
    }
    
    render(){

    return(
        <div className='topSongs'>
            <h2>Топ композиций</h2>
            <Link to="/songs" onClick={()=>this.onClickAllButton()}>См. все</Link>
            <div className='topSongsBlock'>
            {
                songs.sort(function(a,b){return b.likes-a.likes}).slice(0,6).map((song)=>{
                    return (
                        <Song
                            key={song.id}
                            song={song}
                        />
                    )
                })
            }

            </div>
        </div>
    )
    }
}


const mapDispatchToProps = (dispatch) =>({
    addAlbum: (album) => dispatch({
        type:'ADD_ALBUM',
        album:album,
        }),
    addFilterToState: (filter) => dispatch({
        type:'ADD_FILTER',
        filter: filter,
    })
})

export default connect (null , mapDispatchToProps) (TopSongs);


