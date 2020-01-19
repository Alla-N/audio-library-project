export const currentAlbumReducer = (state={   

}, action) => {

    switch(action.type) { 
    
    case 'ADD_ALBUM': 
    return { 
        ...state,
        album:[action.album],
    }; 
    
    default: return state; } 
}
    