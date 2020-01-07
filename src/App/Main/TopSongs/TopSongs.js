import React from 'react';
import './TopSongs.css';
import {Link} from 'react-router-dom';
import {songs} from '../../songs';

const TopSongs = () => {
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
                        <div className='topSong' key={id}>
                            <div className="topSong_button buttonPlay"></div>
                            <div className="topSong_title">
                                <div className="artist_name">
                                    <Link to={`/artists/${artistName}`}>{artistName}</Link> 
                                </div>
                                <div className="song_name">{songName}</div>
                            </div>
                            <div className="topSong_actions">
                                <div className="topSong_button buttonLike">{likes}</div>
                                <div className="topSong_button buttonDownload"></div>
                                <div className="topSong_duration">{length}</div>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default TopSongs;