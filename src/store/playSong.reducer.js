export const playSongReducer = (state={
    
}, action)=> {
    switch(action.type){
        case 'PLAY_SONG':
            return {
                ...state,
                currentSong: [action.src],
                currentArtistName: [action.artistName],
                currentSongName: [action.songName],
                currentSongId:[action.id],
                isPlaying:[action.isPlaying],
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
        case 'NEXT':
            return {
                ...state,
                currentSong: [action.src],
                currentArtistName: [action.artistName],
                currentSongName: [action.songName],
                currentSongId:[action.id],
            };

        default: return state; 
    }
    
};