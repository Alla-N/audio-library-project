import React, {Component} from 'react';
import './TopSongs.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {songs} from '../../songs';
import TopSong from './TopSong/TopSong';

class TopSongs extends Component {

    componentDidMount = () => {
        let currentAlbum = songs.sort(function(a,b){return b.likes-a.likes}).slice(0,6);
        this.props.addAlbum (currentAlbum);
    }
    
    render(){

    return(
        <div className='topSongs'>
            <h2>Топ композиций</h2>
            <Link to="/songs">См. все</Link>
            <div className='topSongsBlock'>
            {
                songs.sort(function(a,b){return b.likes-a.likes}).slice(0,6).map(({
                    id,
                    songName,
                    artistName,
                    src,
                    hashtag,
                    likes,
                    length
                })=>{
                    return (
                        <TopSong
                            key={id}
                            id={id}
                            songName={songName}
                            artistName={artistName}
                            src={src}
                            hashtag={hashtag}
                            likes={likes}
                            length={length}
                        />
                    )
                })
            }
            </div>
        </div>
    )
    }
}

const mapStateToProps = (state) =>({
    currentSongId: state.playSong.currentSongId,
})

const mapDispatchToProps = (dispatch) =>({
    addAlbum: (album) => dispatch({
        type:'ADD_ALBUM',
        album:album,
        }),
})

export default connect (mapStateToProps, mapDispatchToProps) (TopSongs);


