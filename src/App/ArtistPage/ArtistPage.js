import React, {Component} from 'react';
import './ArtistPage.css';
import TopSong from '../Main/TopSongs/TopSong/TopSong';
import ScrollToTopOnMount from '../ScrollToTopOnMount';
import {songs} from '../songs';


class ArtistPage extends Component {
    render () {

        let name = this.props.match.params.artistName ;
        let artist;
        
        for(var i=0; i<songs.length; i++){
        if(songs[i].artistName===name){
            artist = songs[i];
            break;
        }
    }

    if(artist===undefined)
        return <h2>Page not found</h2>;
    else


        return (
            <div className="artistPage">
            <ScrollToTopOnMount/>
                <div className="artistInfo">
                    <div>
                        <img src={process.env.PUBLIC_URL + artist.artistImg} alt="artistPhoto"></img>
                    </div>
                    <h2>{artist.artistName}</h2>
                </div>
                <div className="artistSongs">

                </div>

                <div className="artistSongs">
                {songs.filter(element=>element.artistName === name).map(({
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
};

export default ArtistPage;