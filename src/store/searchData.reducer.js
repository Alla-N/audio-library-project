export const searchDataReducer = (state={

}, action)  => {
    switch (action.type){
        case "ADD_SEARCH_DATA":
            return{
                value:[action.value],
            }
        default: return state;
    }
}