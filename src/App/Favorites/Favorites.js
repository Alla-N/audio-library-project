import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Favorites.css';
import {songs} from '../songs';
import Song from '../Song/Song';
import ScrollToTopOnMount from '../ScrollToTopOnMount';


class Favorites extends Component {
    constructor(){
        super();
        this.state={
            currentAlbum:[],
        }
    }

    changeAlbumState = () =>{   
        this.props.addAlbum (this.state.currentAlbum);
    }


    componentWillMount = () => { 
        if(this.props.likedList[0]){
            let currentAlbum = songs.filter(e=>this.props.likedList[0].includes(e.id));
            this.setState({
                currentAlbum: currentAlbum
            })
            this.changeAlbumState();
        }  
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.likedList !== this.props.likedList){
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
            <div className="favorites">
            <ScrollToTopOnMount/>
                <h2>Избранное</h2>
                <h4>Сортировка:</h4>
                <div className="favorites_sort">
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
    likedList: state.likedSongs.likedList,
})

const mapDispatchToProps = (dispatch) =>({
    addAlbum: (album) => dispatch({
        type:'ADD_ALBUM',
        album:album,
        }),
})

export default connect (mapStateToProps, mapDispatchToProps) (Favorites);