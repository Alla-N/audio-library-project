import React, {Component} from 'react';
import './TopSongs.css';
import {Link} from 'react-router-dom';
import {songs} from '../../songs';
import TopSong from './TopSong/TopSong';

class TopSongs extends Component {
    render(){
    return(
        <div className='topSongs'>
            <h2>Топ композиций</h2>
            <Link to="/top_songs">См. все</Link>
            <div className='topSongsBlock'>
            {
                songs.sort(function(a,b){return b.likes-a.likes}).slice(0,7).map(({
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
            </div>
        </div>
    )
    }
}

export default TopSongs;