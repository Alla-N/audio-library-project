import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './Results.css';
import {songs} from '../songs';
import {artistsArray} from '../songs';
import Song from '../Song/Song';


class Results extends Component{
    componentDidMount = () => {
        this.changeAlbumState();
    }
    componentDidUpdate = () => {
        this.changeAlbumState();
    }

    // передать в стейт информацию о текущем альбоме
    changeAlbumState = () =>{
        let currentAlbum = songs.filter(e=>((new RegExp(localStorage.getItem('searchData'), 'i')).test(e.songName)))
        this.props.addAlbum (currentAlbum);
    }

    render(){
        return(
            <div className="results">
                <h2>Результаты поиска</h2>
                <h3>Исполнители:</h3>
                <div className="artists_block">
                    {
                        localStorage.getItem('searchData') ? (
                        artistsArray.filter(e=>((new RegExp(localStorage.getItem('searchData'), 'i')).test(e.artistName))).map(({
                            id,
                            artistName,
                            artistImg,
                        })=>{
                            return(
                                <div className="artists_block__artist" key={id}>
                                    <Link to={`/artist/${artistName}`}>
                                    <img
                                    src={process.env.PUBLIC_URL + artistImg}
                                    alt="photoArtist"
                                    />
                                    </Link>
                                    <h3>{artistName}</h3>
                                </div>
                            )
                        })
                        )
                        :
                        (<span></span>)
                    }                   
                </div>
                <h3>Композиции:</h3>
                <div className="songs_block">
                {
                    localStorage.getItem('searchData') ? (
                    songs.filter(e=>((new RegExp(localStorage.getItem('searchData'), 'i')).test(e.songName))).map(song=>{
                        return(
                        <Song
                            key={song.id}
                            song={song}
                        />
                        )
                    }))
                    :
                    (<span></span>)
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
})

export default connect(null,mapDispatchToProps) (Results);