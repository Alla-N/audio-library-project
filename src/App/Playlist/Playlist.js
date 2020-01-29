import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Playlist.css';
import {songs} from '../songs';
import Song from '../Song/Song';
import ScrollToTopOnMount from '../ScrollToTopOnMount';


class Playlist extends Component {
    constructor(){
        super();
        this.state={
            currentAlbum:[],
            checkedList:[],
            checkedListLength: 0,
        }
    }


    static getDerivedStateFromProps = (nextProps, prevState) => {
        if(nextProps.checkedListLength !== prevState.checkedListLength){
            let currentAlbum = songs.filter(e=>nextProps.checkedList.includes(e.id));
            nextProps.addAlbum (currentAlbum);
            return { currentAlbum: currentAlbum, checkedList: nextProps.checkedList, checkedListLength: nextProps.checkedListLength };
        }
        else return null;
    }



    sortArtist = () => {
        this.setState({
            currentAlbum: this.state.currentAlbum.sort(function(a,b){
                if(a.artistName > b.artistName){
                    return 1;
                }else if(a.artistName < b.artistName){
                    return -1;
                }else{
                    return 0;
                }
            })
        });
            
        this.props.addAlbum(this.state.currentAlbum);
    }

    sortName = () => {
        this.setState({
            currentAlbum: this.state.currentAlbum.sort(function(a,b){
                if(a.songName > b.songName){
                    return 1;
                }else if(a.songName < b.songName){
                    return -1;
                }else{
                    return 0;
                }
            })
        });
            
        this.props.addAlbum(this.state.currentAlbum);
    }

    sortRating = () => {
        this.setState({
            currentAlbum: this.state.currentAlbum.sort(function(a,b){
                if(a.likes > b.likes){
                    return -1;
                }else if(a.likes < b.likes){
                    return 1;
                }else{
                    return 0;
                }
            })
        });
        this.props.addAlbum(this.state.currentAlbum);
    }

    sortShuffle = () => {
            this.setState({
                currentAlbum: this.state.currentAlbum.sort(function(a,b){
                return Math.random() - 0.5;
            })
        });
        this.props.addAlbum(this.state.currentAlbum);
    }



    render(){
        return(
            <div className="playlist">
            <ScrollToTopOnMount/>
                <h2>Мой плейлист</h2>
                <h4>Сортировка:</h4>
                <div className="playlist_sort">
                    <div><button onClick={this.sortArtist}>по автору</button></div>
                    <div><button onClick={this.sortName}>по названию</button></div>
                    <div><button onClick={this.sortRating}>по рейтингу</button></div>
                    <div><button onClick={this.sortShuffle}>перемешать</button></div>
                </div>
                {
                    this.state.currentAlbum.map((song)=>{
                    return (
                        <Song
                            key={song.id}
                            song={song}
                        />
                    )
                })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) =>({
    currentAlbum: state.currentAlbum.album,
    checkedList: state.playlist.checkedList,
    checkedListLength: state.playlist.length,
})

const mapDispatchToProps = (dispatch) =>({
    addAlbum: (album) => dispatch({
        type:'ADD_ALBUM',
        album:album,
        }),
})

export default connect (mapStateToProps, mapDispatchToProps) (Playlist);