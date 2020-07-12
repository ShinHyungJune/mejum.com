import {SET_TARGET, SET_TARGETS} from '../types';


const initialsState = {
    targets: {
        data: [],
        meta: {}
    },
    target: {}
};

export default (state = initialsState, action) => {
    switch (action.type) {
        default:
            return state;

        case SET_TARGETS:
            return {
                ...state,
                targets: action.payload
            };

        case SET_TARGET:
            return {
                ...state,
                target: action.payload
            };
    }
}
