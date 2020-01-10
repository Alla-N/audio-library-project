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
            <audio src={this.props.currentSrc} controls autoplay="true"></audio>
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
    });

export default connect(mapStateToProps, mapDispatchToProps)(Footer);