import React, {Fragment, useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {connect} from 'react-redux';
import {setFlash, logout} from "../../actions/commonActions";

const Header = ({setFlash, logout, user}) => {

    let location = useLocation();


    let hideUrlList = ["/login", "/sendResetPasswordMail", "/register", "/passwordReset"];

    let [hide, setHide] = useState(hideUrlList.includes(location.pathname));

    useEffect(() => {
        setHide(hideUrlList.includes(location.pathname));
    }, [location]);

    return (
        hide ? null : (
            <header className="header bg--primary clearfix">
                <p className="header-title" style={{float:"left"}}>그룹 목록</p>

                <button onClick={logout} style={{color:"#fff", float:"right", fontSize:"14px", position:"relative", top:"3px"}}>로그아웃</button>
            </header>
        )
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
