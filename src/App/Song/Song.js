import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './Song.css';

class Song extends Component {
    constructor(){
        super();
        this.state = {
            key: Math.random(),
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
        let audio = document.getElementsByTagName('audio');  

        if(this.props.isPlaying){
            if(this.props.currentSong.id === this.props.song.id){
                this.props.pause();
                audio[0].pause();
            }else{
                this.props.playNewSong(this.props.song);
            }
        }else{
            if(!this.props.currentSong || this.props.currentSong.id !== this.props.song.id){
                this.props.playNewSong(this.props.song)
            }else{
                    this.props.play();
                    audio[0].play()
            }

        }
    }

// внести или удалить id выбраной песни в плейлист
    changeCheckState = () =>{
        let id  =this.props.song.id;
        let checkedList;
        if(this.props.checkedList){
            checkedList = this.props.checkedList;
            if(this.props.checkedList.includes(id)){
                let index = checkedList.indexOf(id);
                checkedList.splice(index,1)
                this.props.changePlaylist(checkedList, checkedList.length);        
            }else{ 
                checkedList.push(id);    
                this.props.changePlaylist(checkedList, checkedList.length);
            }
        }else{
            checkedList = [];
            checkedList.push(id);    
            this.props.changePlaylist(checkedList);
        } 
        
            this.setState({ key: Math.random() });
    }

// внести или удалить id выбраной песни в список лайкнутых 
    changeLikeState = () =>{
        let id  =this.props.song.id;
        let likedList;
        if(this.props.likedList){
            likedList = this.props.likedList;
            if(this.props.likedList.includes(id)){
                let index = likedList.indexOf(id);
                likedList.splice(index,1)
                this.props.changeLikedList(likedList, likedList.length);        
            }else{ 
                likedList.push(id);    
                this.props.changeLikedList(likedList, likedList.length);
            }
        }else{
            likedList = [];
            likedList.push(id);    
            this.props.changeLikedList(likedList);
        } 
        this.setState({ key: Math.random() });      
    }

        
    render(){
        const {
            song
        } = this.props

        let isChecked = this.props.checkedList.includes(song.id);
        let isLiked = this.props.likedList.includes(song.id);
        let isPlaying = this.props.isPlaying && this.props.currentSong.id===song.id;

    return (
    <div className="song" key={this.state.key}>
        <div className="buttonPlay" onClick={()=>this.onClickPlayButton()}>
            { isPlaying ? <div className="pause"></div> : <div className="play"></div>}
        </div>
        <div className="song_title">
            <span className="artist_name">
                <Link to={`/artist/${song.artistName}`}>{song.artistName}</Link>
            </span>
            <span className="song_name">{song.songName}</span>
        </div>
        <div className="song_actions">

            <div className="song_button buttonCheck" onClick={()=>this.onClickCheckButton()}>
            {isChecked ? <div className="checked"></div> :  <div className="unChecked"></div>}
            </div>

            <div className="song_button buttonLike" onClick={()=>this.onClickLikeButton()}>
            {isLiked ? <div className="liked"></div> :  <div className="unLiked"></div>}
            {isLiked ? <span>{song.likes+1}</span> : <span>{song.likes}</span>}
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
    changePlaylist: (checkedList, length) => dispatch({
        type:'CHANGE_PLAYLIST',
        checkedList:checkedList,
        length: length,
    }),   
    changeLikedList: (likedList, length) => dispatch({
        type:'CHANGE_LIKEDLIST',
        likedList:likedList,
        length: length,
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