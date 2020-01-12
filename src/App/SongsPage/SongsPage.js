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
            songsPerPag: 8,
        };

    }



    Paginate = (num) => {
        this.setState({ 
            currentPage: num,
        });
    }

    componentDidMount(){
        let list  =document.getElementById('1');
        list.className = "pagination_item_current"
    }


    ChangeColorNum = (event) => {
        
        let current = document.getElementsByClassName("pagination_item_current");
        current[0].className = current[0].className.replace("pagination_item_current", "pagination_item");
        event.target.className = 'pagination_item_current';

    }

    componentWillReceiveProps (nextProps) {

        let currentAlbum = songs;
        let songId = nextProps.currentSongId;
        let songIndex = currentAlbum.findIndex(element => {return element.id == songId});
        let nextIndex;

        if(songIndex < currentAlbum.length-1){
            nextIndex = songIndex+1
        }else{
            nextIndex = 0
        }


        this.props.addNextSongId (currentAlbum, nextIndex);

        let isSongLastOnPage = nextIndex > this.state.currentPage*this.state.songsPerPag || songIndex == 0;

        if(isSongLastOnPage){
            let pages = document.getElementsByTagName('li');
            let nextPage;

            if(this.state.currentPage < pages.length){
                nextPage = this.state.currentPage;
                pages[nextPage].click();
            }else{
                nextPage = 0;
                pages[nextPage].click();
            }

            
        }
    }


    render(){
        let indexOfLastSong;

        if(this.state.currentPage * this.state.songsPerPag<songs.length){
            indexOfLastSong = this.state.currentPage * this.state.songsPerPag;
        }else{
            indexOfLastSong = songs.length;
        }

        const indexOfFirstSong = this.state.currentPage * this.state.songsPerPag - this.state.songsPerPag;

        const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong );
        const totalPage = Math.round(songs.length/this.state.songsPerPag);

        const pageNumbers = [];

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
})

const mapDispatchToProps = (dispatch) =>({
    addNextSongId: (album,index) => dispatch({
        type:'ADD_NEXT_SONG',
        album:album,
        nextIndex:index,
        }),
})

export default connect(mapStateToProps, mapDispatchToProps) (SongsPage);