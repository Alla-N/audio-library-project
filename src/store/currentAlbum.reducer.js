export const currentAlbumReducer = (state={
    currentPage: 1,
    songsPerPag: 10,

}, action) => {

    switch(action.type) { 
    
    case 'ADD_ALBUM': 
    return { 
        ...state,
        album:[action.album],
    }; 

    case 'ADD_ALBUM_DETAILS': 
    return { 
        ...state,
        firstIndexes: [action.firstIndexes],
        lastIndexes: [action.lastIndexes],
        currentPage: [action.currentPage],
        pagesLength: [action.pagesLength],
    };
    
    default: return state; } 
}
    