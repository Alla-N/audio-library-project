export const likeSongReducer = (state={
    likedList:[],
}, action) => {

    switch(action.type) { 
    
        case 'CHANGE_LIKEDLIST': 
        return { 
            likedList: action.likedList,
            length: action.length, 
        };  
    
    default: return state; } 
}
    