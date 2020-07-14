import React, {Fragment, useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {connect} from 'react-redux';
import {setFlash, logout} from "../../actions/commonActions";

const Header = ({setFlash, logout, user}) => {

    let location = useLocation();


    // let hideUrlList = ["/login", "/sendResetPasswordMail", "/register", "/passwordReset"];

    // let [hide, setHide] = useState(hideUrlList.includes(location.pathname));

    // let [active, setActive] = useState(false);



    return (
        <header className="header bg--primary">
            <p className="header-title">그룹 목록</p>
        </header>
    );
};
const mapState = (state) => {
    return {
        user: state.commonStates.user
    }
};

const mapDispatch = (dispatch) => {
    return {
        setFlash: (data) => {
            dispatch(setFlash(data));
        },

        logout: (data) => {
            dispatch(logout(data));
        }
    }
};
export default connect(mapState, mapDispatch)(Header);
