import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Playlist.css';
import {songs} from '../songs';
import TopSong from '../Main/TopSongs/TopSong/TopSong';
import ScrollToTopOnMount from '../ScrollToTopOnMount';


class Playlist extends Component {
    constructor(){
        super();
        this.state={

        }
    }

    createAlbum = () => {
        let checkedObj = this.props.checkedList;
        let checkedId = []
        for (let key in checkedObj){
            if(checkedObj[key] === true)  checkedId.push(Number(key)) 
        }

        let currentAlbum = songs.filter(e=>checkedId.includes(e.id));
        this.setState({
            checkedId: checkedId,
            currentAlbum: currentAlbum,
        })
    }

    componentWillMount = () => {
        this.createAlbum();
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.checkedList !== this.props.checkedList){
            this.createAlbum();
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
                    this.state.currentAlbum.map(({
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
        )
    }
}

const mapStateToProps = (state) =>({
    checkedList: state.playlist.isChecked,
})

const mapDispatchToProps = (dispatch) =>({
    addAlbum: (album) => dispatch({
        type:'ADD_ALBUM',
        album:album,
        }),
})

export default connect (mapStateToProps, mapDispatchToProps) (Playlist);