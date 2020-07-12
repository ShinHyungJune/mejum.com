import {SET_POP, SET_FLASH, SET_USER, SET_TOKEN} from "../types";

export const setPop = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_POP,
            payload: data
        });
    }
};

export const setFlash = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_FLASH,
            payload: data
        })
    }
};

export const login = (user = null) => {

    return (dispatch) => {
        dispatch({
            type: SET_USER,
            payload: user
        });

        localStorage.setItem("user", JSON.stringify(user));
    }
};

export const logout = () => {
    return (dispatch) => {
        axios.post("/logout").then(response => {
            dispatch({
                type: SET_USER,
                payload: null
            });

            localStorage.removeItem("user");

            window.location.replace('/login');
        });
    }
};
