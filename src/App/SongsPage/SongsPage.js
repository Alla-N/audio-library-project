import React, {Component} from 'react';
import './SongsPage.css';
import {connect} from 'react-redux';
import Song from '../Song/Song';
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

    onClickPageButton = (number) => {
        this.changePage(number);  
    }

    onClickAllPages = (event) =>{
        this.changeColorPage(event);
    }

//передать в стейт информацию о текущем альбоме
    changeAlbumState = () =>{
        let currentAlbum = 
        (this.props.filter && this.props.filter !== "all") 
        ? 
        (songs.filter(e=>e.hashtag.includes(this.props.filter)).sort(function(a,b){return b.likes-a.likes})) 
        : 
        (songs.sort(function(a,b){return b.likes-a.likes}));

        this.props.addAlbum (currentAlbum);
    }


// перестроить альбом при переключении страницы
    changePage = (number) => {
        this.setState({ 
            currentPage: number,
        });
    }

// поменять цвет не текущей страницы и текущей
    changeColorPage = (event) => {  
        if(event.target.tagName === 'LI'){
            let current = document.getElementsByClassName("pagination_item_current");
            current[0].className = current[0].className.replace("pagination_item_current", "pagination_item");
            event.target.className = 'pagination_item_current';
        }
    }

//определить первую страницу при перерендере
    initiateFirstPage = () => {
        let list  =document.getElementById('1');
        if(list){
            list.className = "pagination_item_current";
            list.click()
        }
    }


    componentDidMount = () => {   
        this.changeAlbumState();
        this.initiateFirstPage();  
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.filter !== this.props.filter){
            this.changeAlbumState();
            this.initiateFirstPage();
        }  
    }

    render(){  
        let indexOfLastSong;

        let allSongs = 
        (this.props.filter !== "all") 
        ? 
        (songs.filter(e=>e.hashtag.includes(this.props.filter)).sort(function(a,b){return b.likes-a.likes})) 
        : 
        (songs.sort(function(a,b){return b.likes-a.likes}));

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
            <div className="songsPage">
            <ScrollToTopOnMount/>
            {
            (this.props.filter !== "all") ? 
                <h2> Все композиции {this.props.filter}</h2> 
            : 
                <h2> Все композиции</h2>}
            {
                currentSongs.map((song)=>{
                    return (
                        <Song
                            key={song.id}
                            song={song}
                        />
                    )
                })
            }
            <div className="pagination">
                <ul onClick = {this.onClickAllPages}>
                {
                    pageNumbers.map(number=>(
                        <li 
                        id={number} 
                        key={number} 
                        ref={this.input}
                        className="pagination_item" 
                        onClick={()=>this.onClickPageButton(number)}>
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
    currentSong: state.playSong.currentSong,
    filter: state.filteredSongs.filter,
    currentAlbum: state.currentAlbum.album,
})

const mapDispatchToProps = (dispatch) =>({
    addAlbum: (album) => dispatch({
        type:'ADD_ALBUM',
        album:album,
        }),
    addFilterToState: (filter) => dispatch({
        type:'ADD_FILTER',
        filter: filter,
    })
})

export default connect(mapStateToProps, mapDispatchToProps) (SongsPage);