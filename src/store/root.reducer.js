import {combineReducers} from 'redux';
import {addPlaylistReducer} from './addPlaylist.reducer';
import {likeSongReducer} from './likeSong.reducer';
import {playSongReducer} from './playSong.reducer';
import {currentAlbumReducer} from './currentAlbum.reducer';
import {filterSongsReducer} from './filterSongs.reducer';
import {searchDataReducer} from './searchData.reducer';



export const rootReducer = combineReducers({
    playlist: addPlaylistReducer,
    likedSongs: likeSongReducer,
    playSong: playSongReducer,
    currentAlbum: currentAlbumReducer,
    filteredSongs: filterSongsReducer,
    searchData: searchDataReducer,
})