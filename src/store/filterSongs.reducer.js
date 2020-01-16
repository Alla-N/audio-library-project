export const filterSongsReducer = (state={
    filter: "all",
}, action) => {
    switch(action.type){
        case 'ADD_FILTER':
            return{
                ...state,
                filter:[action.filter],
            }
        default: return state;}
}