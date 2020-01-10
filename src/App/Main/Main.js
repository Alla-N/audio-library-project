import React from 'react';
import './Main.css';
import TopArtists from './TopArtists/TopArtists';
import TopSongs from './TopSongs/TopSongs';
import Collections from './Collections/Collections';
import ScrollToTopOnMount from '../ScrollToTopOnMount';

const Main = () => {
    return(
        <div className = 'main'>
            <ScrollToTopOnMount />
            <TopArtists/>
            <TopSongs/>
            <Collections/>
        </div>
    )
}

export default Main;
