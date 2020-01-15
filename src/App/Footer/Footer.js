import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import './Footer.css';

class Footer extends Component {

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
            let index = album.findIndex(element => {return element.id == this.props.currentSongId});
            let prevIndex = index>0 ? index-1 : album.length-1;
            this.props.next(album[prevIndex].src, album[prevIndex].artistName, album[prevIndex].songName, album[prevIndex].id);

            this.ClickPagePrev(index);
    }

    NextSongPlay = () => {
        let album = this.props.currentAlbum[0];
        let index = album.findIndex(element => {return element.id == this.props.currentSongId});
        let nextIndex = index<album.length-1 ? index+1 : 0;
        this.props.next(album[nextIndex].src, album[nextIndex].artistName, album[nextIndex].songName, album[nextIndex].id);
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
            let index = album.findIndex(element => {return element.id == this.props.currentSongId});
            let nextIndex = index<album.length-1 ? index+1 : 0;

            console.log(this.props.lastIndexes);
            console.log(this.props.currentPage);
            console.log(this.props.pagesLength);

            this.props.next(album[nextIndex].src, album[nextIndex].artistName, album[nextIndex].songName, album[nextIndex].id);
            
            this.ClickPage(index);

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
                    <span className="footer_buttonLike" onClick={this.changeLikeButtonState}>
                        {this.props.isLiked ? <span className="like"></span> :  <span className="dislike"></span>}
                    </span>
                    <button className="button_prev" onClick={this.PrevSongPlay}></button>
                    <button className="button_next" onClick={this.NextSongPlay}></button>
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
    currentSongId: state.playSong.currentSongId,
    isPlaying: state.playSong.isPlaying,
    currentAlbum: state.currentAlbum.album,
    firstIndexes: state.currentAlbum.firstIndexes,
    lastIndexes: state.currentAlbum.lastIndexes,
    currentPage: state.currentAlbum.currentPage,
    pagesLength: state.currentAlbum.pagesLength,
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