import { SUCCESS, ERROR, RESET_ERROR, RESET_SUCCESS, POST_COMMENT_SUCCESS, POST_REPLY_SUCCESS, UPDATE_CONFESS_SUCCESS, UPDATE_COMMENT_SUCCESS,
        UPDATE_REPLY_SUCCESS } from '../Actions/snackBarActions/snackBarActions';

const initState = {
    success : {
        postConfess : { value : false, msg : '' },
        postComment : { value : false, msg : '' },
        postReply : { value : false, msg : '' },
        updateConfess: { value : false, msg : '' },
        updateComment: { value : false, msg : '' },
        updateReply: { value : false, msg : '' },
    },
    error : {
        value : false,
        msg : ''
    }
}

export const snackBarReducer = (state = initState, action) => {
    switch(action.type) {
        case SUCCESS :
                    return {
                        ...state,
                        success : {
                            ...state.success,
                            postConfess : {
                                value : true,
                            }
                        }
                    }
        case POST_COMMENT_SUCCESS :
                    return {
                        ...state,
                        success : {
                            ...state.success,
                            postComment : {
                                value : true,
                            }
                        }
                    }    
        case POST_REPLY_SUCCESS :
                    return {
                        ...state,
                        success : {
                            ...state.success,
                            postReply : {
                                value : true
                            }
                        }
                    }
        case UPDATE_CONFESS_SUCCESS :
                    return {
                        ...state,
                        success : {
                            ...state.success,
                            updateConfess : {
                                value : true
                            }
                        }
                    }
        case UPDATE_COMMENT_SUCCESS :
                    return {
                        ...state,
                        success : {
                            ...state.success,
                            updateComment : {
                                value : true
                            }
                        }
                    }
        case UPDATE_REPLY_SUCCESS :
                    return {
                        ...state,
                        success : {
                            ...state.success,
                            updateReply : {
                                value : true
                            }
                        }
                    }
        case ERROR :
                    return {
                        ...state,
                        error : {
                            ...state.error,
                            value : true,
                            msg : action.msg
                        }
                    }
        case RESET_SUCCESS :
            return {
                ...state,
                success : { ...initState.success },
                msg : action.msg
            }
        case RESET_ERROR :
            return {
                ...state,
                success : false,
                msg : action.msg
            }
        default : return state;    
    }
}
