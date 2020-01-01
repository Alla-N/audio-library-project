import React from 'react';
import './Main.css';
import TopArtists from './TopArtists/TopArtists';
import TopSongs from './TopSongs/TopSongs';
import Collections from './Collections/Collections'

const Main = () => {
    return(
        <div className = 'main'>
            <TopArtists/>
            <TopSongs/>
            <Collections/>
        </div>
    )
}

export default Main;
