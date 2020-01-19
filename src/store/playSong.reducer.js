export const playSongReducer = (state={
    isPlaying: false,
}, action)=> {
    switch(action.type){
        case 'PLAY_NEW_SONG':
            return {
                ...state,
                currentSong: [action.song],
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