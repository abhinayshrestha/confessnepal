import { LOADING_USER, LOADING_USER_SUCCESS, LOADING_USER_ERROR } from '../Actions/userActions/userActions';

const initState = {
    loadingData : false,
    user : null,
}

export const userReducer = (state = initState, action) => {
    switch(action.type) {
        case LOADING_USER :
                    return {
                        ...state,
                        loadingData : true
                    }
        case LOADING_USER_SUCCESS : 
                    return {
                        ...state,
                        loadingData : false,
                        user : {...action.user}
                    }
        case LOADING_USER_ERROR : 
                    return {
                        ...state,
                        loadingData : false,
                    }
        default : return state;
    }
}