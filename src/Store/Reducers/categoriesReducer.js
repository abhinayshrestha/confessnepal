import { LOADING_CATEGORIES, LOADING_CATEGORIES_SUCCESS, LOADING_CATEGORIES_FAIL } from '../Actions/categoriesAction/catogoriesActions';

const initState = {
    loader : false,
    categories : null
}

export const categoriesReducer = (state = initState, action) => {
    switch(action.type) {
        case LOADING_CATEGORIES :
                    return {
                        ...state,
                        loader : true
                    }
        case LOADING_CATEGORIES_SUCCESS : 
                    return {
                        ...state,
                        loader : false,
                        categories : [...action.categories]
                    }
        case LOADING_CATEGORIES_FAIL : 
                    return {
                        ...state,
                        loader : false,
                    }
        default : return state;
    }
}