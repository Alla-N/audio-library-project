import React from 'react';
import './Main.css';
import TopArtists from './TopArtists/TopArtists';
import TopSongs from './TopSongs/TopSongs';
import ScrollToTopOnMount from '../ScrollToTopOnMount';

const Main = () => {
    return(
        <div className = 'main'>
            <ScrollToTopOnMount />
            <TopArtists/>
            <TopSongs/>
        </div>
    )
}

export default Main;
