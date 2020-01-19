export const playSongReducer = (state={
    isPlaying: false,
}, action)=> {
    switch(action.type){
        case 'PLAY':
            return {
                ...state,
                currentSong: [action.song],
                isPlaying: true,
            };
        case 'PAUSE':
            return {
                ...state,
                currentSong: [action.song],
                isPlaying: false,
            };
        default: return state; 
    }
    
};