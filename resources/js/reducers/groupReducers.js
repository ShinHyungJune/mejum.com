import {SET_ACTIVE_GROUP} from '../types';


const initialsState = {
    activeGroup: null
};

export default (state = initialsState, action) => {
    switch (action.type) {
        default:
            return state;

        case SET_ACTIVE_GROUP:
            return {
                ...state,
                activeGroup: action.payload
            };
    }
}
