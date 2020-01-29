export const addPlaylistReducer = (state={
    checkedList:[],
}, action) => {

    switch(action.type) { 
    
    case 'CHANGE_PLAYLIST': 
    return { 
        checkedList: action.checkedList, 
        length: action.length,
    };  

    default: return state; } 
}
    