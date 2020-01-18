export const addPlaylistReducer = (state={

}, action) => {

    switch(action.type) { 
    
    case 'ADD_TO_PLAYLIST': 
    return { 
        ...state,
        [action.id]:true,
    }; 
    
    case 'REMOVE_FROM_PLAYLIST': 
    return { 
        ...state,
        [action.id]:false,
    }; 
    
    default: return state; } 
}
    