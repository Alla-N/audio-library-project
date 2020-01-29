export const playSongReducer = (state={
    currentSong:null,
    isPlaying: false,
}, action)=> {
    switch(action.type){
        case 'PLAY_NEW_SONG':
            return {
                currentSong: action.song,
                isPlaying: true,
            };
        case 'PLAY':
            return {
                ...state,
                isPlaying: true,
            };
        case 'PAUSE':
            return {
                ...state,
                isPlaying: false,
            };
        default: return state; 
    }
    
};