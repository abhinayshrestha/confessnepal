import { AUTHENTICATE_SUCCESS, START_AUTHENTICATE, AUTHENTICATE_FAIL } from './authActions';
import axios from 'axios'

export const authenticate = user => {
    return dispatch => {
        dispatch({ type : START_AUTHENTICATE })
        axios.post('/auth/facebook', { _id : user.userId, name : user.name, profilePicURL : user.profilePicURL },
            { headers : { Authorization : `Bearer ${user.accessToken}` } })
            .then(res => {
                if(res.status === 200){
                    localStorage.setItem('token', res.data.token);
                    dispatch({ type : AUTHENTICATE_SUCCESS, token : res.data.token })
                }
                else {
                    dispatch({ type : AUTHENTICATE_FAIL })
                }
            })
            .catch(err => {
                dispatch({ type : AUTHENTICATE_FAIL })
            })
    }
}

export const checkAuth = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(token) {
            dispatch({ type : AUTHENTICATE_SUCCESS, token : token })
        }
        else {
            localStorage.removeItem('token');
        }
    }
}