import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './Footer.css';

class Footer extends Component {
    constructor(){
        super();
        this.state = {
            indexNextSong: 0,
            indexPrevSong: 0,
        }
    }

    onClickPrevButton = () => {
        this.playPrevSong();
    }

    onClickNextButton = () => {
        this.playNextSong();
    }

// установить индекы предыдущей и следующей песни в альбоме относительно текущей
    setIndexes = () => {
        let album = this.props.currentAlbum[0];
        let index = album.findIndex(e => e.id === this.props.currentSong[0].id);
        let nextIndex = index<album.length-1 ? index+1 : 0;
        let prevIndex = index === 0 ? album.length-1 : index-1;

        this.setState({
            currentIndex: index,
            indexNextSong: nextIndex,
            indexPrevSong: prevIndex,
        })
    }

// Переключить страницу вперед если закончила играть последняя песня
changePageNext = () => {
    let pages = document.querySelectorAll(".pagination li")
    if(pages){
        if(this.state.indexNextSong !== 0 && this.state.indexNextSong%10 === 0){
            let pageNumber = this.state.indexNextSong/10;
            pages[pageNumber].click()       
        }else if(this.state.indexNextSong === 0){
            pages[0].click() 
        }
    }      
}

//Переключить страницу назад
changePagePrev = () => {
    let pages = document.querySelectorAll(".pagination li");
    let pageNumber;
    console.log(pages[3])
    if(pages){
        if(this.state.currentIndex%10 === 0 && this.state.currentIndex !== 0){
            pageNumber = this.state.currentIndex/10 - 1;
            pages[pageNumber].click()       
        }else if(this.state.currentIndex === 0){
            pageNumber = pages.length-1
            pages[pageNumber].click() 
        }
    }      
}


// играть следующий трек
    playNextSong = () => {
        let album = this.props.currentAlbum[0];
        if(album.length>0){
            this.props.playNewSong(album[this.state.indexNextSong]);
            this.changePageNext();
        }else{
            alert("В альбоме нет песен")
        }
    }

// играть предыдущий трек
    playPrevSong = () => {
        let album = this.props.currentAlbum[0];
        if(album.length>0){
            this.props.playNewSong(album[this.state.indexPrevSong]);
            this.changePagePrev();
        }else{
            alert("В альбоме нет песен")
        }
    }


    componentDidMount = () => {
        let audio = document.getElementsByTagName("audio")[0];
        
        if(audio){
            audio.addEventListener("playing", ()=>{this.setIndexes(); this.props.play()}, false)
            audio.addEventListener("pause", ()=>{this.props.pause()}, false)
            audio.addEventListener("ended", ()=>{this.playNextSong()}, false)
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.currentSong && prevProps.currentAlbum !== this.props.currentAlbum){
            this.setIndexes()
        }
    }


    render(){

        if(this.props.currentSong){
            let player = document.getElementsByClassName('footer')[0];
            player.style.display = 'flex';
        }

    return (
        <div className = 'footer'>
            <div className="mp3">
                <div className="mp3_buttons">
                    <span className="button_prev" onClick={this.onClickPrevButton}></span>
                    <span className="button_next" onClick={this.onClickNextButton}></span>
                </div>
        
                <div className="mp3_title">
                <span>Текущая песня:</span>              
                    { 
                    this.props.currentSong ?
                        <span className="mp3_title_block">
                            <span className="song_artistName">
                                <Link to={`/artist/${this.props.currentSong[0].artistName}`}>
                                    {this.props.currentSong[0].artistName}
                                </Link>
                            </span> 
                            <span>
                                {this.props.currentSong[0].songName}
                            </span>
                        </span>
                    :
                        <span>не найдена</span>
                    }
                </div>
            </div>
            {
                this.props.currentSong ?
                <audio src={this.props.currentSong[0].src} controls autoPlay></audio>
                :
                <audio src=""></audio>
            }
            
        </div>
    )
}
}

const mapStateToProps = (state) => ({
    currentSong: state.playSong.currentSong,
    currentAlbum: state.currentAlbum.album,
});

const mapDispatchToProps = (dispatch) =>({
    playNewSong: (song) => dispatch ({
        type: 'PLAY_NEW_SONG',
        song: song,
    }),
    play: () => dispatch ({
        type: 'PLAY',
    }),
    pause: () => dispatch ({
        type: 'PAUSE',
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);