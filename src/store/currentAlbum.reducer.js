export const currentAlbumReducer = (state={

}, action) => {

    switch(action.type) { 
    
    case 'ADD_NEXT_SONG': 
    return { 
        ...state,
        album:[action.album],
        nextIndex:[action.nextIndex],
    }; 
    
    default: return state; } 
}
    