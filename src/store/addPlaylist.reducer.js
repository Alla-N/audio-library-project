export const addPlaylistReducer = (state={
    isChecked:{       
    }
}, action) => {

    switch(action.type) { 
    
    case 'ADD_TO_PLAYLIST': 
    return {
        ...state,  
        isChecked:{   
            ...state.isChecked,
            [action.id]:true,
        } 
    }; 
    
    case 'REMOVE_FROM_PLAYLIST': 
    return { 
        ...state,
        isChecked:{
            ...state.isChecked,
            [action.id]:false,
        },
    };  

    default: return state; } 
}
    