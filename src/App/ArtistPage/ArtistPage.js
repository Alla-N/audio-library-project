import React, {Component} from 'react';
import {connect} from 'react-redux';
import './ArtistPage.css';
import TopSong from '../Main/TopSongs/TopSong/TopSong';
import ScrollToTopOnMount from '../ScrollToTopOnMount';
import {songs} from '../songs';


class ArtistPage extends Component {

    componentDidMount = () => {
        let currentAlbum = songs.filter(element=>element.artistName === this.props.match.params.artistName );
        this.props.addAlbum (currentAlbum);
    }

    UNSAFE_componentWillReceiveProps(nextProps){

        if(nextProps.currentSongId !== this.props.currentSongId){

        let album = this.props.currentAlbum[0];

        let totalPage = Math.ceil(album.length/this.props.songsPerPag);
    
        let lastIndexes = [];
    
        for (let i=1; i<=totalPage; i++){
            let index = i*this.props.songsPerPag-1;
            if(index<album.length){
                lastIndexes.push(index);
            }else{
                lastIndexes.push(album.length-1);
            }
        } 

        let firstIndexes=[];

        for (let i=0; i<totalPage; i++){
            let index = i*(this.props.songsPerPag);
            firstIndexes.push(index);
        } 

        this.props.addAlbumDetail(firstIndexes, lastIndexes, this.props.currentPage, totalPage);
        }
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
                            key={id}
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
    filter: state.filteredSongs.filter,
    songsPerPag: state.currentAlbum.songsPerPag,
    currentPage: state.currentAlbum.currentPage,
    currentAlbum: state.currentAlbum.album,
    currentSongId: state.playSong.currentSongId,
})

const mapDispatchToProps = (dispatch) =>({
    addAlbum: (album) => dispatch({
        type:'ADD_ALBUM',
        album:album,
        }),
    addAlbumDetail: (firstIndexes, lastIndexes, currentPage, pagesLength) => dispatch({
        type:'ADD_ALBUM_DETAILS',
        firstIndexes: firstIndexes,
        lastIndexes: lastIndexes,
        currentPage: currentPage,
        pagesLength: pagesLength,
        }),
})

export default connect(mapStateToProps, mapDispatchToProps) (ArtistPage);