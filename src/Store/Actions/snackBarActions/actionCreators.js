import { SUCCESS, ERROR, RESET_ERROR, RESET_SUCCESS, POST_COMMENT_SUCCESS, POST_REPLY_SUCCESS, UPDATE_CONFESS_SUCCESS, UPDATE_COMMENT_SUCCESS,
        UPDATE_REPLY_SUCCESS, DELETING_COMMENT_SUCCESS, DELETING_REPLY_SUCCESS } from './snackBarActions'

const resetSuccess = () => {
    return {
        type : RESET_SUCCESS
    }
}

const resetError = () => {
    return{ 
        type : RESET_ERROR 
    }
}

export const success = () => {
    return dispatch => {
        dispatch({ type : SUCCESS })
        setTimeout(() => {
            dispatch(resetSuccess());
        },3000)
    }
}

export const postCommentSuccess = () => {
    return dispatch => {
        dispatch({ type : POST_COMMENT_SUCCESS })
        setTimeout(() => {
            dispatch(resetSuccess());
        },3000)
    }
}

export const postReplySuccess = () => {
    return dispatch => {
        dispatch({ type : POST_REPLY_SUCCESS })
        setTimeout(() => {
            dispatch(resetSuccess());
        },3000)
    }
}

export const updateConfessSuccess = () => {
    return dispatch => {
        dispatch({ type : UPDATE_CONFESS_SUCCESS })
        setTimeout(() => {
            dispatch(resetSuccess());
        },3000)
    }
}

export const updateCommentSuccess = () => {
    return dispatch => {
        dispatch({ type : UPDATE_COMMENT_SUCCESS })
        setTimeout(() => {
            dispatch(resetSuccess());
        },3000)
    }
}

export const updateReplySuccess = () => {
    return dispatch => {
        dispatch({ type : UPDATE_REPLY_SUCCESS })
        setTimeout(() => {
            dispatch(resetSuccess());
        },3000)
    }
}

export const deleteCommentSuccess = () => {
    return dispatch => {
        dispatch({ type : DELETING_COMMENT_SUCCESS })
        setTimeout(() => {
            dispatch(resetSuccess());
        },1000)
    }
}

export const deleteReplySuccess = () => {
    return dispatch => {
        dispatch({ type : DELETING_REPLY_SUCCESS })
        setTimeout(() => {
            dispatch(resetSuccess());
        },1000)
    }
}

export const error = () => {
    return dispatch => {
        dispatch({ type : ERROR })
        setTimeout(() => {
            dispatch(resetError());
        },3000)
    }
}
