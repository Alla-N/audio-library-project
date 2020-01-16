import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import '../TopSongs.css';

class TopSong extends Component {

    changeLikeButtonState = () =>{

        if(this.props.isLiked){
        
        this.props.addDislike(this.props.id);
        
        }else{
        
        this.props.addLike(this.props.id);

        }
    }

    changePlayButtonState = () =>{
        let song = document.getElementsByTagName('audio');  

        // Если песня не играет и id в стейте не совпадает с кликнутой песней, тогда включить кликнутую
        if(!this.props.isPlaying && Number(this.props.currentSongId) !== this.props.id){

            this.props.playSong(this.props.src, this.props.artistName, this.props.songName, this.props.id, true);
        
            // Если песня играет НО id в стейте не совпадает с кликнутой песней, тогда включить кликнутую
        }else if((this.props.isPlaying && Number(this.props.currentSongId) !== this.props.id)){
            
            this.props.playSong(this.props.src, this.props.artistName, this.props.songName, this.props.id, true);
        
            // Если песня не играет но она является текущей, просто продолжить воспроизведение
        }else if(!this.props.isPlaying && Number(this.props.currentSongId) === this.props.id){
            
            song[0].play();
            this.props.play(true);
        
            // иначе поставить на паузу
        }else{   
            
            song[0].pause();
            this.props.pause(false);

        }
    }

    startPlaySong = () =>{
        
        this.props.playSong(this.props.src, this.props.artistName, this.props.songName, this.props.id);

    }

    render(){
        const{
            id,
            songName,
            artistName,
            src,
            likes,
            length,
            isLiked = false,
        } = this.props
    return (
    <div className="topSong" key={id}>
        <div className="buttonPlay" onClick={()=>this.changePlayButtonState()}>
            {(Number(this.props.currentSongId) === id && this.props.isPlaying) ? <div className="pause"></div> : <div className="play"></div>}
        </div>
        <div className="topSong_title">
            <div className="artist_name">
                <Link to={`/artist/${artistName}`}>{artistName}</Link>
            </div>
            <div className="song_name">{songName}</div>
        </div>
        <div className="topSong_actions">
            <div className="topSong_button buttonLike" onClick={()=>this.changeLikeButtonState()}>
            {isLiked ? <div className="like"></div> :  <div className="dislike"></div>}
            {isLiked ? likes+1 : likes}
            </div>
            <div className="topSong_button buttonDownload"><a href={src} download> </a></div>
            <div className="topSong_duration">{length}</div>
        </div>
    </div>
    )
    }
}

const mapStateToProps = (state, props) => ({
    currentSongId: state.playSong.currentSongId,
    isLiked: state.likedSongs[props.id],
    isPlaying: state.playSong.isPlaying,
})

const mapDispatchToProps = (dispatch) =>({

addLike: (id) => dispatch({
    type:'LIKE',
    id:id,
    }),
    
addDislike: (id) => dispatch({
    type:'DISLIKE',
    id:id,
    }),
playSong: (src, artistName, songName, SongId, isPlaying) => dispatch ({
    type: 'PLAY_SONG',
    src:src,
    artistName:artistName,
    songName:songName,
    id:SongId,
    isPlaying: isPlaying,
}),
play: (isPlaying) => dispatch ({
    type: 'PLAY',
    isPlaying: isPlaying,
}),
pause: (isPlaying) => dispatch ({
    type: 'PAUSE',
    isPlaying: isPlaying,
}),
});


export default connect(mapStateToProps, mapDispatchToProps) (TopSong);