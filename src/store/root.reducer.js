import {combineReducers} from 'redux';
import {likeSongReducer} from './likeSong.reducer';
import {playSongReducer} from './playSong.reducer';
import {currentAlbumReducer} from './currentAlbum.reducer';



export const rootReducer = combineReducers({
    likedSongs: likeSongReducer,
    playSong: playSongReducer,
    currentAlbum: currentAlbumReducer,
})