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
            isPlaying: false,
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
        if(this.state.isPlaying){
            this.setState((prevState)=>({
                ...prevState,
                isPlaying: false,
            }))
            this.props.pause(this.props.song);
        }else{
            this.setState((prevState)=>({
                ...prevState,
                isPlaying: true,
            }))
            this.props.play(this.props.song);
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
            {(this.state.isPlaying) ? <div className="pause"></div> : <div className="play"></div>}
        </div>
        <div className="song_title">
            <span className="artist_name">
                <Link to={`/artist/${song.artistName}`}>{song.artistName}</Link>
            </span>
            <span className="song_name">{song.songName}</span>
        </div>
        <div className="song_actions">

            <div className="song_button buttonCheck" onClick={()=>this.onClickCheckButton()}>
            {this.state.isChecked ? <div className="checked"></div> :  <div className="unChecked"></div>}
            </div>

            <div className="song_button buttonLike" onClick={()=>this.onClickLikeButton()}>
            {this.state.isLiked ? <div className="liked"></div> :  <div className="unLiked"></div>}
            {this.state.isLiked ? song.likes+1 : song.likes}
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
    isPlaying: state.isPlaying,
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
    play: (song) => dispatch ({
        type: 'PLAY',
        song: song,
    }),
    pause: (song) => dispatch ({
        type: 'PAUSE',
        song: song,
    }),
});


export default connect(mapStateToProps, mapDispatchToProps) (Song);