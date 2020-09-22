import { LOADING_CATEGORIES, LOADING_CATEGORIES_SUCCESS, LOADING_CATEGORIES_FAIL } from './catogoriesActions';
import axios from 'axios'

export const loadCategories = () => {
    return (dispatch, getState) => {
        const token = getState().authReducer.token;
        dispatch({ type : LOADING_CATEGORIES });
        axios.get(`/user/categories`,
            { headers : { Authorization : `Bearer ${token}` } })
        .then(res => {
            dispatch({ type : LOADING_CATEGORIES_SUCCESS, categories : res.data })
        })    
        .catch(err => {
            dispatch({ type : LOADING_CATEGORIES_FAIL })
        })
    }
}
