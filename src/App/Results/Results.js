import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './Results.css';
import {songs} from '../songs';
import {artistsArray} from '../songs';
import Song from '../Song/Song';


class Results extends Component{
    constructor(){
        super();
        this.state = {
            searchData: false,
        }
    }

    componentDidMount = () => {
        this.changeAlbumState();
    }
    componentDidUpdate = () => {
        this.changeAlbumState();
    }

    // передать в стейт информацию о текущем альбоме
    changeAlbumState = () =>{
        let currentAlbum = songs.filter(e=>(e.songName.toLowerCase().includes(this.state.searchData)))
        this.props.addAlbum (currentAlbum);
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        if(nextProps.searchData !== prevState.searchData){
            console.log(prevState)
            return { searchData: nextProps.searchData[0]};
        }
        else return null;
    }

    render(){
        return(
            <div className="results">
                <h2>Результаты поиска</h2>
                <h3>Исполнители:</h3>
                <div className="artists_block">
                    {
                        this.state.searchData ?
                        (artistsArray.filter(e=>(e.artistName.toLowerCase().includes(this.state.searchData))).map(({
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
                        }))
                        :
                        <span></span>
                    }                   
                </div>
                <h3>Композиции:</h3>
                <div className="songs_block">
                {
                    this.state.searchData ?
                    (songs.filter(e=>(e.songName.toLowerCase().includes(this.state.searchData))).map(song=>{
                        return(
                        <Song
                            key={song.id}
                            song={song}
                        />
                        )
                    }))
                    :
                    <span></span>
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>({
    searchData: state.searchData.value,
})

const mapDispatchToProps = (dispatch) =>({
    addAlbum: (album) => dispatch({
        type:'ADD_ALBUM',
        album:album,
        }),
})

export default connect(mapStateToProps, mapDispatchToProps) (Results);