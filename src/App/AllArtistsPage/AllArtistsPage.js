import React from 'react';
import './AllArtistsPage.css';
import {Link} from 'react-router-dom';
import {artistsArray} from '../songs'

const AllArtistsPage = () => {
    return (
    <div className="allArtistsPage">
        <h1>Каталог исполнителей</h1>
        <Link to="/">На главную</Link>
        <div className="allArtistsBlock">
        {
            artistsArray.map(({
                id,
                artistName,
                artistImg
            })=>{
                return(
                    <div className="artist" key={id}>
                        <Link to={`/artist/${artistName}`}>
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

export default AllArtistsPage;