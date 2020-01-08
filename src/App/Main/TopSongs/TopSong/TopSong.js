import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import '../TopSongs.css';

class TopSong extends Component {

    changeLikeButtonState = () =>{

        if(this.props.isLiked){
        
        this.props.addDislike(this.props.id)
        
        }else{
        
        this.props.addLike(this.props.id)
        }
    }

    render(){
        const{
            id,
            songName,
            artistName,
            src,
            hashtag,
            likes,
            length,
            isLiked = false,
        } = this.props
    return (
    <div className="topSong" key={id}>
        <div className="topSong_button buttonPlay"></div>
        <div className="topSong_title">
            <div className="artist_name">
                <Link to={`/artists/${artistName}`}>{artistName}</Link>
            </div>
            <div className="song_name">{songName}</div>
        </div>
        <div className="topSong_actions">
            <div className="topSong_button buttonLike" onClick={()=>this.changeLikeButtonState()}>
            {isLiked ? <div className="like"></div> :  <div className="dislike"></div>}
            {likes}
            </div>
            <div className="topSong_button buttonDownload"></div>
            <div className="topSong_duration">{length}</div>
        </div>
    </div>
    )
    }
}

const mapStateToProps = (state, props) => ({
    isLiked: state[props.id]
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
});


export default connect(mapStateToProps, mapDispatchToProps) (TopSong);