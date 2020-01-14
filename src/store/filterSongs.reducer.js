export const filterSongsReducer = (state={
    
}, action) => {
    switch(action.type){
        case 'ADD_FILTER':
            return{
                ...state,
                filter:[action.filter],
            }
        default: return state;}
}