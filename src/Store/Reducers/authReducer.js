import { AUTHENTICATE_SUCCESS, START_AUTHENTICATE, AUTHENTICATE_FAIL } from '../Actions/authActions/authActions';

const initState = {
    token : null,
    authLoader : false,
}

export const authReducer = (state = initState, action) => {
    switch(action.type) {
        case START_AUTHENTICATE : 
                    return {
                        ...state,
                        authLoader : true
                    }
        case AUTHENTICATE_SUCCESS : 
                    return {
                        ...state,
                        authLoader : false,
                        token : action.token
                    }
        case AUTHENTICATE_FAIL :
                    return {
                        ...state,
                        authLoader : false
                    }            
        default : return state;
    }
}