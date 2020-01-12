import React, {Component} from 'react';
import './TopSongs.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {songs} from '../../songs';
import TopSong from './TopSong/TopSong';

class TopSongs extends Component {

    componentWillReceiveProps (nextProps) {

        let currentAlbum = songs.sort(function(a,b){return b.likes-a.likes}).slice(0,6);
        let songId = nextProps.currentSongId;
        let songIndex = currentAlbum.findIndex(element => {return element.id == songId});
        let nextIndex;

        if(songIndex < currentAlbum.length-1){
            nextIndex = songIndex+1
        }else{
            nextIndex = 0
        }


        this.props.addNextSongId (currentAlbum, nextIndex);
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
    addNextSongId: (album,index) => dispatch({
        type:'ADD_NEXT_SONG',
        album:album,
        nextIndex:index,
        }),
})

export default connect (mapStateToProps, mapDispatchToProps) (TopSongs);


