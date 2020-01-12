import React, {Component} from 'react';
import {connect} from 'react-redux';
import './ArtistPage.css';
import TopSong from '../Main/TopSongs/TopSong/TopSong';
import ScrollToTopOnMount from '../ScrollToTopOnMount';
import {songs} from '../songs';


class ArtistPage extends Component {

    componentWillReceiveProps (nextProps) {

        let currentAlbum = songs.filter(element=>element.artistName === this.props.match.params.artistName )
        let songId = nextProps.currentSongId;
        let songIndex = currentAlbum.findIndex(element => {return element.id == songId});
        let nextIndex;

        if(songIndex < currentAlbum.length-1){
            nextIndex = songIndex+1
        }else{
            nextIndex = 0
        }


        this.props.addNextSongId (currentAlbum, nextIndex);
    }




    render () {

        let name = this.props.match.params.artistName ;
        let artist;
        
        for(var i=0; i<songs.length; i++){
            if(songs[i].artistName===name){
                artist = songs[i];
                break;
            }
        }



    if(artist===undefined)
        return <h2>Page not found</h2>;
    else


        return (
            <div className="artistPage">
            <ScrollToTopOnMount/>
                <div className="artistInfo">
                    <div>
                        <img src={process.env.PUBLIC_URL + artist.artistImg} alt="artistPhoto"></img>
                    </div>
                    <h2>{artist.artistName}</h2>
                </div>
                <div className="artistSongs">

                </div>

                <div className="artistSongs">
                {songs.filter(element=>element.artistName === name).map(({
                    id,
                    songName,
                    artistName,
                    src,
                    hashtag,
                    likes,
                    length
                })=>{
                    return (
                        <TopSong
                            id={id}
                            songName={songName}
                            artistName={artistName}
                            src={src}
                            hashtag={hashtag}
                            likes={likes}
                            length={length}
                        />
                    )
                })
                }
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) =>({
    currentSongId: state.playSong.currentSongId,
})

const mapDispatchToProps = (dispatch) =>({
    addNextSongId: (album,index) => dispatch({
        type:'ADD_NEXT_SONG',
        album:album,
        nextIndex:index,
        }),
})

export default connect(mapStateToProps, mapDispatchToProps) (ArtistPage);