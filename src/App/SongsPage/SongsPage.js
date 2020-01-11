import React, {Component} from 'react';
import './SongsPage.css';
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




    render(){
        const indexOfLastSong = this.state.currentPage * this.state.songsPerPag;
        const indexOfFirstSong = indexOfLastSong - this.state.songsPerPag;
        const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong );
        const totalPage = songs.length/this.state.songsPerPag;

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

export default SongsPage;