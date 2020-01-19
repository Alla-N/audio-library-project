export const addPlaylistReducer = (state={
    checkedList:{},
}, action) => {

    switch(action.type) { 
    
    case 'CHANGE_PLAYLIST': 
    return { 
        checkedList: [action.checkedList] 
    };  

    default: return state; } 
}
    