import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import './Footer.css';

class Footer extends Component {

    changePlaylistButtonState = () => {
        if(this.props.isChecked){        
            this.props.removeFromPlaylist(this.props.currentSongId);            
        }else{           
            this.props.addToPlaylist(this.props.currentSongId);   
        }
    }

    changeLikeButtonState = () =>{
        if(this.props.isLiked){       
            this.props.addDislike(this.props.currentSongId);        
        }else{       
            this.props.addLike(this.props.currentSongId);
        }
    }

    ClickPage = (index) => {
        if(this.props.lastIndexes[0].includes(index)){
            let pages = document.getElementsByTagName('li');
            let nextClick;               
            if(pages[0]){
                if(this.props.currentPage[0] < this.props.pagesLength[0]){
                    nextClick = this.props.currentPage[0];
                    pages[nextClick].click();
                }else{
                    nextClick = 0;
                    pages[nextClick].click();
                }
            } 
        }
    }

    ClickPagePrev = (index) => {
        if(this.props.firstIndexes[0].includes(index)){
            let pages = document.getElementsByTagName('li');
            let nextClick;               
            
            if(pages[0]){
                if(this.props.currentPage[0] > 1){
                    nextClick = this.props.currentPage[0]-2;
                    pages[nextClick].click();
                }else{
                    nextClick = this.props.pagesLength[0]-1;
                    pages[nextClick].click();
                } 
            }
        }
    }


    PrevSongPlay = () => {
            let album = this.props.currentAlbum[0];
            let index = album.findIndex(element => {return element.id === Number(this.props.currentSongId)});
            let prevIndex = index>0 ? index-1 : album.length-1;

            if(album.length!==0){
            this.props.next(album[prevIndex].src, album[prevIndex].artistName, album[prevIndex].songName, album[prevIndex].id);
            }
            
            this.ClickPagePrev(index);
    }

    NextSongPlay = () => {
        let album = this.props.currentAlbum[0];
        let index = album.findIndex(element => {return element.id === Number(this.props.currentSongId)});
        let nextIndex = index<album.length-1 ? index+1 : 0;

        if(album.length!==0){
        this.props.next(album[nextIndex].src, album[nextIndex].artistName, album[nextIndex].songName, album[nextIndex].id);
        }
        
        this.ClickPage(index);
    }

    componentDidMount(){
        let song = document.getElementsByTagName('audio');

        song[0].addEventListener('play',() => { 
            this.props.play(true);
        },false);

        song[0].addEventListener('pause',() => { 
            this.props.pause(false);
        },false);

        song[0].addEventListener('ended',() => { 
            let album = this.props.currentAlbum[0];
            let index = album.findIndex(element => {return element.id === Number(this.props.currentSongId)});
            let nextIndex = index<album.length-1 ? index+1 : 0;

            if(album.length!==0){
            this.props.next(album[nextIndex].src, album[nextIndex].artistName, album[nextIndex].songName, album[nextIndex].id);
            }

            this.ClickPage(index);

        },false);
    }

    render(){

        if(this.props.currentSrc){
            let mp3 = document.getElementsByClassName('mp3')[0];
            mp3.style.display = 'block'
        }

    return (
        <div className = 'footer'>
            <div className="mp3">
                <div className="title">
                    <span className="footer_buttonAdd" onClick={this.changePlaylistButtonState}>
                        {this.props.isChecked ? <span className="footer_checked"></span> :  <span className="footer_unchecked"></span>}
                    </span>
                    <span className="footer_buttonLike" onClick={this.changeLikeButtonState}>
                        {this.props.isLiked ? <span className="footer_like"></span> :  <span className="footer_dislike"></span>}
                    </span>
                    <span className="button_prev" onClick={this.PrevSongPlay}></span>
                    <span className="button_next" onClick={this.NextSongPlay}></span>
                    <span className="footer_artist_name"><Link to={`/artist/${this.props.artistName}`}>{this.props.artistName}</Link></span>                 
                    <span className="footer_song_name">{this.props.songName}</span>       
                </div>
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
    currentSongId: state.playSong.currentSongId,
    isPlaying: state.playSong.isPlaying,
    currentAlbum: state.currentAlbum.album,
    firstIndexes: state.currentAlbum.firstIndexes,
    lastIndexes: state.currentAlbum.lastIndexes,
    currentPage: state.currentAlbum.currentPage,
    pagesLength: state.currentAlbum.pagesLength,
});

const mapDispatchToProps = (dispatch) =>({
    addToPlaylist: (id) => dispatch({
        type:'ADD_TO_PLAYLIST',
        id:id,
    }),
    removeFromPlaylist: (id) => dispatch({
        type:'REMOVE_FROM_PLAYLIST',
        id:id,
    }),
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
    addAlbumDetail: (firstIndexes, lastIndexes, currentPage, pagesLength) => dispatch({
        type:'ADD_ALBUM_DETAILS',
        firstIndexes: firstIndexes,
        lastIndexes: lastIndexes,
        currentPage: currentPage,
        pagesLength: pagesLength,
        }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);