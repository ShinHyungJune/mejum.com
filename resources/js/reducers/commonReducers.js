import {SET_POP, SET_LOADING, SET_FLASH, SET_USER, SET_TOKEN} from '../types';
import {getLocalUser, getLocalToken} from '../utilities/auth';

const user = getLocalUser();
const token = getLocalToken();

const initialsState = {
    user: user,
    token: token,
    pop: null,
    loading: false,
    flash: null
};

export default (state = initialsState, action) => {
    switch (action.type) {
        default:
            return state;

        case SET_POP:
            return {
                ...state,
                pop: action.payload
            };

        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };

        case SET_FLASH:
            return {
                ...state,
                flash: action.payload
            };
            
        case SET_USER:
            return {
                ...state,
                user: action.payload
            };
            
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload
            };
    }
}
