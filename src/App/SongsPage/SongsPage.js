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

    AddAlbumToState = () => {
        let currentAlbum = this.props.filter ? (songs.filter(e=>e.hashtag.includes(this.props.filter[0])).sort(function(a,b){return b.likes-a.likes})) : (songs.sort(function(a,b){return b.likes-a.likes}));

        this.props.addAlbum(currentAlbum);
    }

    AddAlbumInformationToState = (nextProps) => {

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
    
            this.props.addAlbumDetail(firstIndexes, lastIndexes, this.state.currentPage, totalPage, this.props.songsPerPag);
    
    }



    componentDidMount = () => {   
        let list  =document.getElementById('1');
        if(list){
        list.className = "pagination_item_current";
        }

        this.AddAlbumToState();

    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.currentSongId  !== this.props.currentSongId ){
            this.AddAlbumInformationToState(nextProps);
        }
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.filter !== this.props.filter){
            let list  =document.getElementById('1');
            if(list){
            list.className = "pagination_item_current";
            list.click()
            }

            this.AddAlbumToState();
            this.AddAlbumInformationToState(this.props);
        }
    
    }

    componentWillUnmount(){
        this.props.addFilterToState("all");
    }



    render(){  
            let indexOfLastSong;
            let allSongs;
            if(this.props.filter && this.props.filter[0] !== "all"){
                allSongs =  (songs.filter(e=>e.hashtag.includes(this.props.filter[0])).sort(function(a,b){return b.likes-a.likes}));
            }else if(this.props.filter[0] === "all" || !this.props.filter){
                allSongs =  (songs.sort(function(a,b){return b.likes-a.likes}));
            }

            if(this.state.currentPage * this.props.songsPerPag<allSongs.length){
                indexOfLastSong = this.state.currentPage * this.props.songsPerPag;
            }else{
                indexOfLastSong = allSongs.length;
            }
    
            let indexOfFirstSong = this.state.currentPage * this.props.songsPerPag - this.props.songsPerPag;
            let currentSongs =  allSongs.slice(indexOfFirstSong, indexOfLastSong);
            let totalPage = Math.ceil(allSongs.length/this.props.songsPerPag);
    
            let pageNumbers = [];
    
            for (let i=1; i<=totalPage; i++){
                pageNumbers.push(i);
            } 

        return(
            <div className="songPage">
            <ScrollToTopOnMount/>
            {(this.props.filter && this.props.filter[0] !== "all") ? <h2> Все композиции {this.props.filter}</h2> : <h2> Все композиции</h2>}
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
                    ))
                }
                </ul>
            </div>

            </div>

        )

        
    }
}

const mapStateToProps = (state) =>({
    songsPerPag: state.currentAlbum.songsPerPag,
    currentSongId: state.playSong.currentSongId,
    filter: state.filteredSongs.filter,
    currentAlbum: state.currentAlbum.album,
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
    addFilterToState: (filter) => dispatch({
        type:'ADD_FILTER',
        filter: filter,
    })
})

export default connect(mapStateToProps, mapDispatchToProps) (SongsPage);