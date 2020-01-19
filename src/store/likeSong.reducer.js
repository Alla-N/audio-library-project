export const likeSongReducer = (state={
    likedList:{},
}, action) => {

    switch(action.type) { 
    
        case 'CHANGE_LIKEDLIST': 
        return { 
            likedList: [action.likedList] 
        };  
    
    default: return state; } 
}
    