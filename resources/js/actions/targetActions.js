import {SET_TARGET, SET_TARGETS} from "../types";
import {setFlash} from "./commonActions";

export const setTargets = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_TARGETS,
            payload: data
        });
    }
};

export const setTarget = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_TARGET,
            payload: data
        });
    }
};
