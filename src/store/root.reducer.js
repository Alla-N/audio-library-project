import {combineReducers} from 'redux';
import {likeSongReducer} from './likeSong.reducer';
import { playSongReducer } from './playSong.reducer';



export const rootReducer = combineReducers({
    likedSongs: likeSongReducer,
    playSong: playSongReducer,
})