import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { confessReducer } from './confessReducer';
import { categoriesReducer } from './categoriesReducer';
import { userReducer } from './userReducer';
import { snackBarReducer } from './snackBarReducer';

export const rootReducer = combineReducers({
    authReducer,
    confessReducer,
    categoriesReducer,
    userReducer,
    snackBarReducer
})