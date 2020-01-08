export const playSongReducer = (state={

}, action)=> {
    switch(action.type){
        case 'PLAY_SONG':
            return {
                ...state,
                currentSong: [action.src],
            };

        default: return state; 
    }
    
};