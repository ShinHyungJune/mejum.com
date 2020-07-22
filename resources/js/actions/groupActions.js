import {SET_ACTIVE_GROUP} from "../types";
import {setFlash} from "./commonActions";

export const setActiveGroup = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_ACTIVE_GROUP,
            payload: data
        });
    }
};