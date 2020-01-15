import React, {Component} from 'react';
import './TopSongs.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {songs} from '../../songs';
import TopSong from './TopSong/TopSong';

class TopSongs extends Component {

    componentDidMount = () => {
        let currentAlbum = songs.sort(function(a,b){return b.likes-a.likes}).slice(0,6);
        this.props.addAlbum (currentAlbum);
    }


    UNSAFE_componentWillReceiveProps(nextProps){

        if(nextProps.currentSongId  !== this.props.currentSongId ){

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

        this.props.addAlbumDetail(firstIndexes, lastIndexes, 1, totalPage);
        }
    }
    
    render(){

    return(
        <div className='topSongs'>
            <h2>Топ композиций</h2>
            <Link to="/songs">См. все</Link>
            <div className='topSongsBlock'>
            {
                songs.sort(function(a,b){return b.likes-a.likes}).slice(0,6).map(({
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
}

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

export default connect (mapStateToProps, mapDispatchToProps) (TopSongs);


