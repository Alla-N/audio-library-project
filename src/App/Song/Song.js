import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './Song.css';

class Song extends Component {
    constructor(){
        super();
        this.state = {
            isChecked : false,
            isLiked: false,
        }
    }

    onClickPlayButton = () => {
        this.changePlayState();
    }

    onClickCheckButton = () => {
        this.changeCheckState()
    }

    onClickLikeButton = () => {
        this.changeLikeState()
    }

// поменять статус проигрывания песни
    changePlayState = () =>{
        if(this.props.isPlaying){
            let audio = document.getElementsByTagName('audio')
            this.props.pause();
            audio[0].pause()
        }else if(this.props.isPlaying && this.props.currentSong[0].id != this.props.song.id){
            this.props.playNewSong(this.props.song)
        }else if(!this.props.isPlaying && !this.props.currentSong){
            this.props.playNewSong(this.props.song)
        }else{
            let audio = document.getElementsByTagName('audio');
            if(audio){
                this.props.play();
                audio[0].play()
            }
        }
    }

// внести или удалить id выбраной песни в плейлист
    changeCheckState = () =>{
        let checkedList;
        if(this.props.checkedList[0]){
            checkedList = this.props.checkedList[0];
        }else{
            checkedList = [];
        }

        if(this.state.isChecked){
            this.setState((prevState)=>({
                ...prevState,
                isChecked: false
            }))
            let index = checkedList.indexOf(this.props.song.id);
            checkedList.splice(index,1)
            this.props.changePlaylist(checkedList);        
        }else{ 
            this.setState((prevState)=>({
                ...prevState,
                isChecked: true,
            }))
            checkedList.push(this.props.song.id);    
            this.props.changePlaylist(checkedList);
        }
    }

// внести или удалить id выбраной песни в список лайкнутых 
    changeLikeState = () =>{
        let likedList;
        if(this.props.likedList[0]){
            likedList = this.props.likedList[0];
        }else{
            likedList = [];
        }

        if(this.state.isLiked){
            this.setState((prevState)=>({
                ...prevState,
                isLiked: false,
            }))
            let index = likedList.indexOf(this.props.song.id);
            likedList.splice(index,1)
            this.props.changeLikedList(likedList);        
        }else{ 
            this.setState((prevState)=>({
                ...prevState,
                isLiked: true,
            }))
            likedList.push(this.props.song.id);    
            this.props.changeLikedList(likedList);
        }
    }


    render(){
        const {
            song
        } = this.props

    return (
    <div className="song">
    
        <div className="buttonPlay" onClick={()=>this.onClickPlayButton()}>
            {(this.props.isPlaying && this.props.currentSong[0].id==song.id) ? <div className="pause"></div> : <div className="play"></div>}
        </div>
        <div className="song_title">
            <span className="artist_name">
                <Link to={`/artist/${song.artistName}`}>{song.artistName}</Link>
            </span>
            <span className="song_name">{song.songName}</span>
        </div>
        <div className="song_actions">

            <div className="song_button buttonCheck" onClick={()=>this.onClickCheckButton()}>
            {(this.props.checkedList[0] && this.props.checkedList[0].includes(song.id)) ? <div className="checked"></div> :  <div className="unChecked"></div>}
            </div>

            <div className="song_button buttonLike" onClick={()=>this.onClickLikeButton()}>
            {(this.props.likedList[0] && this.props.likedList[0].includes(song.id)) ? <div className="liked"></div> :  <div className="unLiked"></div>}
            {(this.props.likedList[0] && this.props.likedList[0].includes(song.id)) ? <span>{song.likes+1}</span> : <span>{song.likes}</span>}
            </div>
            <div className="song_button buttonDownload"><a href={this.props.song.src} download> </a></div>
            <div className="song_duration">{song.length}</div>
        </div>
    </div>
    )
    }
}

const mapStateToProps = (state) => ({
    currentSong: state.playSong.currentSong,
    checkedList: state.playlist.checkedList,
    likedList: state.likedSongs.likedList,
    isPlaying: state.playSong.isPlaying,
})

const mapDispatchToProps = (dispatch) =>({
    changePlaylist: (checkedList) => dispatch({
        type:'CHANGE_PLAYLIST',
        checkedList:checkedList,
    }),   
    changeLikedList: (likedList) => dispatch({
        type:'CHANGE_LIKEDLIST',
        likedList:likedList,
    }),
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


export default connect(mapStateToProps, mapDispatchToProps) (Song);