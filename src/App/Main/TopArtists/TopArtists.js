import React from 'react';
import './TopArtists.css';
import {Link} from 'react-router-dom';
import {artistsArray} from '../../songs';

const TopArtists = () => {
    return (
    <div className="topArtists">
        <h2>Топ исполнители</h2>
        <Link to="/artists">См. все</Link>
        <div className="topArtistsBlock">
        {
            artistsArray.slice(0,5).map(({
                artistName,
                artistImg
            })=>{
                return(
                    <div className="topArtist">
                        <Link to="/">
                        <img
                        src={process.env.PUBLIC_URL + artistImg}
                        alt="photoArtist"
                        />
                        </Link>
                        <h3>{artistName}</h3>
                    </div>
                )
            })
        }
        </div>
    </div>
    );
}

export default TopArtists;