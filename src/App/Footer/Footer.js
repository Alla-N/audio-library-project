import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './Footer.css';

class Footer extends Component {
    constructor(){
        super();
        this.state = {
            
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
            indexNextSong: nextIndex,
            indexPrevSong: prevIndex,
        })
    }

// играть следующий трек
    playNextSong = () => {
        let album = this.props.currentAlbum[0];
        this.props.play(album[this.state.indexNextSong]);
    }

// играть предыдущий трек
    playPrevSong = () => {
        let album = this.props.currentAlbum[0];
        this.props.play(album[this.state.indexPrevSong]);
    }


    componentDidMount = () => {
        let audio = document.getElementsByTagName("audio")[0];
        
        if(audio){
            audio.addEventListener("playing", ()=>{this.setIndexes()}, false)
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
                Текущая песня:
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
    play: (song) => dispatch ({
        type: 'PLAY',
        song: song,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);