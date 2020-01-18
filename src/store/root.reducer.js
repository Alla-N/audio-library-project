import {combineReducers} from 'redux';
import {addPlaylistReducer} from './addPlaylist.reducer';
import {likeSongReducer} from './likeSong.reducer';
import {playSongReducer} from './playSong.reducer';
import {currentAlbumReducer} from './currentAlbum.reducer';
import {filterSongsReducer} from './filterSongs.reducer';



export const rootReducer = combineReducers({
    playlistSongs: addPlaylistReducer,
    likedSongs: likeSongReducer,
    playSong: playSongReducer,
    currentAlbum: currentAlbumReducer,
    filteredSongs: filterSongsReducer,
})