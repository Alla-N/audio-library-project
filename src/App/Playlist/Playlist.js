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
        }
    }

    changeAlbumState = () =>{ 
        console.log (this.state)  
        this.props.addAlbum (this.state.currentAlbum);
    }


    componentWillMount = () => { 
        if(this.props.checkedList[0]){
            let currentAlbum = songs.filter(e=>this.props.checkedList[0].includes(e.id));
            this.setState({
                currentAlbum: currentAlbum
            })

            this.props.addAlbum (currentAlbum);
        }  
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.checkedList !== this.props.checkedList){
            this.changeAlbumState();
        }
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
})

const mapDispatchToProps = (dispatch) =>({
    addAlbum: (album) => dispatch({
        type:'ADD_ALBUM',
        album:album,
        }),
})

export default connect (mapStateToProps, mapDispatchToProps) (Playlist);