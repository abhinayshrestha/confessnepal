import { LOADING_USER, LOADING_USER_SUCCESS, LOADING_USER_ERROR } from './userActions';
import axios from 'axios'

export const loadUser = () => {
    return (dispatch, getState) => {
        dispatch({ type : LOADING_USER });
        const token = getState().authReducer.token;
        axios.get('/user',
            { headers : { Authorization : `Bearer ${token}` } })
            .then(res => {
                dispatch({ type : LOADING_USER_SUCCESS, user : {...res.data} })
            })
            .catch(err => {
                dispatch({ type : LOADING_USER_ERROR });
            })
    }
}