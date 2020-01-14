export const currentAlbumReducer = (state={

}, action) => {

    switch(action.type) { 
    
    case 'ADD_ALBUM': 
    return { 
        ...state,
        album:[action.album],
        firstIndexes: [action.firstIndexes],
        lastIndexes: [action.lastIndexes],
        currentPage: [action.currentPage],
        pagesLength: [action.pagesLength],
    }; 
    
    default: return state; } 
}
    