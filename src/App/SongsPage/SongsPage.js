import React, {Component} from 'react';
import './SongsPage.css';
import {connect} from 'react-redux';
import TopSong from '../Main/TopSongs/TopSong/TopSong';
import ScrollToTopOnMount from '../ScrollToTopOnMount';
import {songs} from '../songs';


class SongsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            songsPerPag: 10,
        };
    }

    Paginate = (num) => {
        this.setState({ 
            currentPage: num,
        });
    }


    ChangeColorNum = (event) => {  
        if(event.target.tagName === 'LI'){
            let current = document.getElementsByClassName("pagination_item_current");
            current[0].className = current[0].className.replace("pagination_item_current", "pagination_item");
            event.target.className = 'pagination_item_current';
        }
    }



    componentDidMount = () => {   
        let list  =document.getElementById('1');
        if(list){
        list.className = "pagination_item_current";
        }

        let currentAlbum = songs.sort(function(a,b){return b.likes-a.likes});
        this.props.addAlbum(currentAlbum);
    }

    UNSAFE_componentWillReceiveProps(nextProps){

        if(nextProps.currentSongId !== this.props.currentSongId){

        let album = this.props.currentAlbum[0];

        let totalPage = Math.ceil(album.length/this.state.songsPerPag);
    
        let lastIndexes = [];
    
        for (let i=1; i<=totalPage; i++){
            let index = i*this.state.songsPerPag-1;
            if(index<album.length){
                lastIndexes.push(index);
            }else{
                lastIndexes.push(album.length-1);
            }
        } 

        let firstIndexes=[];

        for (let i=0; i<totalPage; i++){
            let index = i*(this.state.songsPerPag);
            firstIndexes.push(index);
        } 

        let currentAlbum = songs.sort(function(a,b){return b.likes-a.likes});
        this.props.addAlbum(currentAlbum,firstIndexes, lastIndexes, this.state.currentPage, totalPage);
        }
    }



    render(){  
            let indexOfLastSong;
            let allSongs =  (songs.sort(function(a,b){return b.likes-a.likes}));

            if(this.state.currentPage * this.state.songsPerPag<allSongs.length){
                indexOfLastSong = this.state.currentPage * this.state.songsPerPag;
            }else{
                indexOfLastSong = allSongs.length;
            }
    
            let indexOfFirstSong = this.state.currentPage * this.state.songsPerPag - this.state.songsPerPag;
            let currentSongs =  allSongs.slice(indexOfFirstSong, indexOfLastSong);
            let totalPage = Math.ceil(allSongs.length/this.state.songsPerPag);
    
            let pageNumbers = [];
    
            for (let i=1; i<=totalPage; i++){
                pageNumbers.push(i);
            } 

        return(
            <div className="songPage">
            <ScrollToTopOnMount/>
            <h2> Все композиции</h2>
            {
                currentSongs.map(({
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
            <div className="pagination">
                <ul onClick={this.ChangeColorNum}>
                {
                    pageNumbers.map(number=>(
                        <li 
                        id={number} 
                        key={number} 
                        ref={this.input}
                        className="pagination_item" 
                        onClick={()=>this.Paginate(number)}>
                            {number}
                        </li>
                    )
                    )
                }
                </ul>
            </div>

            </div>

        )

        
    }
}

const mapStateToProps = (state) =>({
    currentSongId: state.playSong.currentSongId,
    filter: state.filteredSongs.filter,
    currentAlbum: state.currentAlbum.album,
})

const mapDispatchToProps = (dispatch) =>({
    addAlbum: (album, firstIndexes, lastIndexes, currentPage, pagesLength) => dispatch({
        type:'ADD_ALBUM',
        album:album,
        firstIndexes: firstIndexes,
        lastIndexes: lastIndexes,
        currentPage: currentPage,
        pagesLength: pagesLength,
        }),
})

export default connect(mapStateToProps, mapDispatchToProps) (SongsPage);