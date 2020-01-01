import React from 'react';
import './TopArtists.css';
import {Link} from 'react-router-dom';

const TopArtists = () => {
    return (
    <div className="topArtists">
        <h2>Топ исполнители</h2>
        <Link to="/">См. все</Link>
        <div className="topArtistsBlock">
            <div className="topArtist">
                <Link to="/">
                    <img
                    src={process.env.PUBLIC_URL + "/artistsImg/Zivert.jpg"}
                    alt="zivertImg"
                    />
                </Link>
                <h3>Zivert</h3>
            </div>
            <div className="topArtist">
                <Link to="/">
                    <img
                        src={process.env.PUBLIC_URL + "/artistsImg/Elman.jpg"}
                        alt="elmantImg"
                    />
                    </Link>
                <h3>Elman</h3>
            </div>
            <div className="topArtist">
                <Link to="/">
                    <img
                        src={process.env.PUBLIC_URL + "/artistsImg/BillieEilish.jpg"}
                        alt="BillieEilishImg"
                    />
                </Link>
                <h3>Billie Eilish</h3>
            </div>
            <div className="topArtist">
                <Link to="/">
                    <img
                        src={process.env.PUBLIC_URL + "/artistsImg/АниЛорак.jpeg"}
                        alt="АниЛоракImg"
                    />
                </Link>
                <h4>Ани Лорак</h4>
            </div>
            <div className="topArtist">
                <Link to="/">
                    <img
                        src={process.env.PUBLIC_URL + "/artistsImg/ВремяИстекло.jpg"}
                        alt="ВремяИстеклоImg"
                    />
                </Link>
                <h4>Время и Стекло</h4>
            </div>
        </div>
    </div>
    );
}

export default TopArtists;