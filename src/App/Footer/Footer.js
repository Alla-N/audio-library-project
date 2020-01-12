import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import './Footer.css';

class Footer extends Component {

    changeLikeButtonState = () =>{

        if(this.props.isLiked){
        
        this.props.addDislike(this.props.id);
        
        }else{
        
        this.props.addLike(this.props.id);

        }
    }

    componentDidMount = () => {
        let song = document.getElementsByTagName('audio');

        song[0].addEventListener('play',() => { 
            this.props.play(true);
            
        },false);

        song[0].addEventListener('pause',() => { 
            this.props.pause(false);
        },false);

        song[0].addEventListener('ended',() => { 
            let song = document.getElementsByTagName('audio');
            console.log('Песня закончилась?', song[0].ended);

            let album = this.props.currentAlbum[0];
            let index = this.props.nextIndex;

            this.props.next(album[index].src, album[index].artistName, album[index].songName, album[index].id);
        },false);
    }
    

    render(){

        if(this.props.currentSrc){
            let mp3 = document.getElementsByClassName('mp3')[0];
            mp3.style.display = 'flex'
        }

    return (
        <div className = 'footer'>
            <div className="mp3">
                <span className="title">
                    <span className="footer_buttonLike" onClick={()=>this.changeLikeButtonState()}>
                        {this.props.isLiked ? <span className="like"></span> :  <span className="dislike"></span>}
                    </span>
                    <Link to={`/artist/${this.props.artistName}`}>
                        <span className="artist_name">{this.props.artistName}</span>
                    </Link>
                    <span className="song_name">{this.props.songName}</span>
                    
                </span>
            </div>
            <audio src={this.props.currentSrc} controls autoPlay></audio>
        </div>
    )
}
}

const mapStateToProps = (state) => ({
    currentSrc: state.playSong.currentSong,
    artistName: state.playSong.currentArtistName,
    songName: state.playSong.currentSongName,
    isLiked: state.likedSongs[state.playSong.currentSongId],
    id: state.playSong.currentSongId,
    isPlaying: state.playSong.isPlaying,
    currentAlbum: state.currentAlbum.album,
    nextIndex: state.currentAlbum.nextIndex,
});

const mapDispatchToProps = (dispatch) =>({

    addLike: (id) => dispatch({
        type:'LIKE',
        id:id,
    }),
        
    addDislike: (id) => dispatch({
        type:'DISLIKE',
        id:id,
    }),
    play: (isPlaying) => dispatch ({
        type: 'PLAY',
        isPlaying: isPlaying,
    }),
    pause: (isPlaying) => dispatch ({
        type: 'PAUSE',
        isPlaying: isPlaying,
    }),
    next: (src, artistName, songName, SongId) => dispatch ({
        type: 'PLAY_SONG',
        src:src,
        artistName:artistName,
        songName:songName,
        id:SongId,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);